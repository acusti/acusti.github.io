---
layout: post
title: Writing Your Amplify Functions in TypeScript via esbuild and Yarn Workspaces
baseline: How to leverage esbuild to set up a simple and fast build process for Amplify lambda functions
credit: 'Photo by <a href="https://unsplash.com/@alexmarcwagner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex Marc Wagner</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
splash: media/alex-marc-wagner-5Co5JGwHuV4-unsplash.jpg
category: blog
published: true
tags: [aws, amplify, lambda, typescript, esbuild, yarn workspaces]
---

AWS Amplify makes writing your front-end application in TypeScript easy. As long as you have a `build` npm run script that takes care of transpiling your TypeScript source code and handling any other build tasks, your application will be deployable via Amplify hosting. However, in order to use TypeScript with Amplify’s lambda functions, you need to do a little more work to compile your source files into plain JS.

The best tool I’ve found for this job is [esbuild][]. Not only does it compile TypeScript very quickly with no configuration required, it also allows you to consolidate all of your dependencies into one file while tree-shaking out any unused code, making your lambda functions faster to start and run. Thanks to those features, esbuild also makes it practical to use the latest v3 of the AWS JS SDK, which provides async / await friendly APIs and allows you to include [only the parts of the SDK][] that you need for the particular lambda function you are building, rather than needing to include the entirety of the SDK. That distinction, incidentally, is why AWS has to make v2 of the aws-sdk available out-of-the-box to any node.js lambda. Otherwise, every lambda deployed to the platform would need to include [all 3MB (minified)][] of the `aws-sdk` package.

Adding esbuild takes just a few steps:

1. Install `esbuild` and `typescript` as a dev dependency for each lambda function. That’s most easily accomplished by `cd`ing into the lambda function directory where the `package.json` is located (`amplify/backend/function/<functionName>/src/`) and running:
   `yarn add -D esbuild typescript`
2. Add a `build` npm run script to each lambda function’s `package.json` to check the function with typescript, then bundle it with esbuild (while esbuild understands and transpiles typescript syntax, it doesn’t do any actual type checking, so if you don’t first run `tsc` against your function, you won’t get any of the actual benefits of using typescript). After a lot of testing and tweaking, here’s what I landed on:

```json
"build": "tsc -noEmit && esbuild *.ts --main-fields=module,main --bundle --platform=node --external:aws-sdk --external:aws-lambda --external:@aws-sdk/signature-v4-crt --outdir=./"
```

    Breaking it down, option by option:

    [`--bundle`][]: inlines all imported dependencies into the output file to enable tree-shaking and reduce lambda size
    [`--platform=node`][]: sets output module format to `cjs` (CommonJS) and marks all built-in node modules as externals so that esbuild won’t try to bundle them
    [`--main-fields=module,main`][]: enables tree-shaking by giving preference to the ES module versions of packages; one result of setting the platform to `node` is that for compatibility reasons, the `main` package.json field (for the CommonJS version of the package) is given priority over the `module` field, which prevents static analysis and tree-shaking
    [`--external:aws-sdk --external:aws-lambda --external:@aws-sdk/signature-v4-crt`][]: prevents the built-in `aws-sdk` v2 package from being included in the bundle, along with the `aws-lambda` CLI tool and `@aws-sdk/signature-v4-crt` (a dependency of e.g. the S3 client), which could otherwise [break your build][] or explode the bundled size of your deployed lambda (here’s a [relevant example issue][])
    [`--outdir=./`][]: writes the resulting file(s) to the same directory with the same filename but a `.js` extension

3. In the root `package.json` for your amplify app, add a run script under the key `"amplify:<functionName>"` to trigger the build script for that lambda function when mocking the function locally or deploying it [(amplify docs reference)][]:

```json
"amplify:<functionName>": "cd amplify/backend/function/<functionName>/src && yarn && yarn build"
```

To make TypeScript work properly, you will also need to include a `tsconfig.json` file alongside your `package.json` in each lambda function’s directory. In order to cut down on duplicate config and duplicate installs, I use the `extends` option to reference my root tsconfig file, then modify a few options for the esbuild use case. As a result, each function’s `tsconfig.json` looks like:

```json
{
    "extends": "../../../../../tsconfig.json",
    "compilerOptions": {
        "lib": ["es2020"],
        "noEmit": true,
        "target": "es2020"
    },
    "include": ["./"]
}
```

The tsconfig.json in the root amplify directory looks like:

```json
{
    "compilerOptions": {
        "allowJs": false,
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./src",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "jsx": "react-jsx",
        "lib": ["dom", "dom.iterable", "esnext"],
        "module": "esnext",
        "moduleResolution": "node",
        "noEmit": true,
        "noFallthroughCasesInSwitch": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": true,
        "target": "es2015"
    },
    "include": ["src"]
}
```

Setting the `baseUrl` option in the root tsconfig means I can then import files in my main amplify app from any of the lambda functions without any `../` parent folder traversal needed (e.g. `import { getItem } from 'graphql/queries.js';`). Both TypeScript and esbuild will be able to find and use the file thanks to the inherited `baseUrl` option.

The last piece of my setup involves leveraging yarn workspaces to share dependencies and avoid excessive duplication. This also means that the `node_modules` folder that amplify zips up as a part of your deployed lambda is empty (all imported files are bundled by esbuild). Each of my lambda functions is its own workspace. Assuming your amplify install is called `myapp`, you could put this in your repo’s root package.json:

```json
  "workspaces": [
    "myapp",
    "myapp/amplify/backend/function/*/src"
  ]
```

[esbuild]: https://esbuild.github.io
[only the parts of the SDK]: https://aws.amazon.com/blogs/developer/modular-aws-sdk-for-javascript-is-now-generally-available/
[all 3MB (minified)]: https://bundlephobia.com/package/aws-sdk
[`--bundle`]: https://esbuild.github.io/api/#bundle
[`--platform=node`]: https://esbuild.github.io/api/#platform
[`--main-fields=module,main`]: https://esbuild.github.io/api/#main-fields
[`--external:aws-sdk --external:aws-lambda --external:@aws-sdk/signature-v4-crt`]: https://esbuild.github.io/api/#external
[break your build]: https://github.com/aws/aws-sdk-js-v3/issues/2747#issuecomment-912341625
[relevant example issue]: https://github.com/aws/aws-sdk-js-v3/issues/2750
[`--outdir=./`]: https://esbuild.github.io/api/#outdir
[(amplify docs reference)]: https://docs.amplify.aws/cli/function/build-options/
