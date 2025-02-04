---
layout: post
title: Making the ESLint Import Plugin Work with Yarn PnP
baseline: How to resolve incorrect errors from the import/order rule when using Yarn’s Plug'n'Play feature
credit: 'Image generated by FLUX.1 [dev] with prompt “clean retro illustration of a NES game controller with a single cable stretching from it to behind a CRT TV screen with an 8-bit version of the poop emoji on the TV screen”'
splash: media/retro-illustration-of-a-nes-game-controller-in-front-of-a-crt-tv-with-the-poop-emoji-on-the-tv.jpg
category: blog
published: true
tags: [eslint, yarn, pnp, typescript, javascript]
---

When collaborating on larger JavaScript or TypeScript projects, the import preambles can become quite long and unmaintainable if conventions are not adopted and enforced. Random import ordering makes code harder to read and update and leads to duplicate imports, as well as opening the door for a lot more git diff noise from differing opinions about import ordering from members of your team. The [`eslint-plugin-import`][]’s [`import/order` rule][] is a powerful tool to help control import statement entropy, and on projects where I’ve configured it, completely eliminates that class of problems. I wouldn’t want to try to maintain a large codebase without it, in a similar way to how I wouldn’t consider working on a project without Prettier (or equivalent code formatter).

> **Update February 4, 2025:** Since writing this, I started using the excellent [Perfectionist plugin][] in place of the `import/order` rule, as I [describe here.][]

Recently, I upgraded one of my projects to use Yarn’s [Plug'n'Play (PnP) feature][], which helps eliminate phantom dependencies and makes package management more reliable. However, this broke my setup, with the import/order rule not working anymore, making the lint step fail across the entire codebase.

If you’ve run into this same issue, or you’re considering using Yarn PnP and want to avoid this headache, here’s how to fix it.

## The Setup

My project uses ESLint v9 with its new flat config system, which means my configuration lives in `eslint.config.js`. Since all of my linted code is TypeScript, I set up the import ordering rules in the TypeScript section of my config:

```javascript
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
    jsPlugin.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: { projectService: true },
        },
        settings: {
            'import/resolver': { typescript: { alwaysTryTypes: true } },
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...tsPlugin.configs.stylistic.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            'import/order': [
                'error',
                {
                    alphabetize: { caseInsensitive: true, order: 'asc' },
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                    ],
                    'newlines-between': 'always',
                },
            ],
        },
    },
];
```

This configuration ensures that imports are consistently grouped and alphabetized: runtime (node.js/bun/workerd/…) builtins first, followed by external packages, internal project imports, and finally relative imports (parent and sibling files). Each group is separated by a single newline for readability.

The setup also uses [`eslint-import-resolver-typescript`][] to handle TypeScript-specific import resolution, including path aliases and type imports. This works when using npm or yarn classic (v1) or even yarn v2+ with the `nodeLinker: node-modules` setting in my `.yarnrc.yml` which I used initially for better compatibility. Promisingly, the typescript resolver also [supports PnP][].

Recently, I ran into some issues with my build and realized I had ghost dependencies from some code I copy-pasted from the [lexical rich text editor playground][]. Those transitive dependencies worked in the build, but were causing some headaches with vite dev’s bundle optimization and, more generally, are unstable and best avoided. So I decided to enable Yarn PnP by setting `nodeLinker: pnp` in my `.yarnrc.yml`.

## The Problem

After enabling PnP, running ESLint started producing a flood of errors about import ordering across my codebase. Here’s a representative sample:

```
/app/routes/users._index.tsx
  1:1  error  There should be at least one empty line between import groups  import/order
  2:1  error  There should be no empty line within import group              import/order

/app/utils/content.tsx
   1:1  error  There should be at least one empty line between import groups  import/order
   1:1  error  `markdown-to-jsx` import should occur after import of `react`  import/order
   3:1  error  There should be at least one empty line between import groups  import/order
  11:1  error  There should be no empty line within import group              import/order

/app/types.ts
  5:1  error  There should be at least one empty line between import groups   import/order
  6:1  error  `zod` import should occur before type import of `react-router`  import/order
```

These errors appeared regardless of how the imports were actually organized, and confusingly, they didn’t indicate anything about what was actually wrong; they complained about missing newlines between groups when the newlines were there, suggested reordering imports that were already in the correct order, and generally seemed to misinterpret the entire import structure of each file.

Why did this happen? The issue stems from the [inability of import plugin][] to resolve external modules under Yarn PnP. When PnP is enabled, external dependencies are declared in a single file and can no longer be resolved using the default npm-style node_modules-based resolution algorithm. The plugin is unable to differentiate the different types of imports and starts reporting all kinds of erroneous errors.

## The Solution

The fix is dead simple. You just need to tell `eslint-plugin-import` where to find your external dependencies by adding the `.yarn` directory to the [`import/external-module-folders` setting][] in your eslint config:

```javascript
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
    jsPlugin.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: { projectService: true },
        },
        settings: {
            'import/resolver': { typescript: { alwaysTryTypes: true } },
            'import/external-module-folders': ['.yarn'], // ← The magic line
        },
        rules: {
            // ... rest of the configuration stays the same
        },
    },
];
```

That one additional line tells the plugin where to find external dependencies when running under Yarn PnP. With this change, eslint-plugin-import can correctly distinguish between external dependencies (now in `.yarn`) and your internal project modules, allowing the `import/order` rule to properly enforce your import ordering conventions.

[`eslint-plugin-import`]: https://github.com/import-js/eslint-plugin-import
[`import/order` rule]: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
[Perfectionist plugin]: https://perfectionist.dev/
[describe here.]: {% link _posts/2025-02-04-eslint-perfectionist-brings-sanity-to-even-the-most-anal-retantitive-programmers.md %}
[Plug'n'Play (PnP) feature]: https://yarnpkg.com/features/pnp
[`eslint-import-resolver-typescript`]: https://github.com/import-js/eslint-import-resolver-typescript
[supports PnP]: https://github.com/import-js/eslint-import-resolver-typescript/issues/130#issuecomment-1175389462
[lexical rich text editor playground]: https://github.com/facebook/lexical/tree/main/packages/lexical-playground
[inability of import plugin]: https://github.com/import-js/eslint-plugin-import/issues/1434#issuecomment-517881976
[`import/external-module-folders` setting]: https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#importexternal-module-folders
