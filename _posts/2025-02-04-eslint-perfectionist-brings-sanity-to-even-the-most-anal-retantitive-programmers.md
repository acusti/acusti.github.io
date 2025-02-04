---
layout: post
title: All Praise Perfectionist, Our New Code-Formatting Overlord
baseline: The ESLint Perfectionist plugin brings order to the chaos and sanity to even the most anal-retentive programmers
credit: 'A room designed by Jill Goldberg of Hudson Interior Designs. (Michael J Lee)'
splash: media/bookshelf-organized-by-color-perfectionist.jpg
category: blog
published: true
tags: [eslint, perfectionist, code-formatting, typescript, javascript]
---

Since I [published a post][] about how to get the `eslint-plugin-import` working with Yarn PnP, I discovered a new plugin called [Perfectionist][] that works great out of the box and requires no extra work to be compatible with different package managers. It completely replaces the need for the `import/order` rule that I struggled to get working. But the biggest transformative thing about it is that all of its rules (or at least all the ones that I’ve run into) can be auto-fixed using the [ESLint `--fix` flag][]. This makes it akin to prettier; it has lots of strong opinions, but it will enforce all of its strong opinions without the need for you to do anything, leaving you to appreciate the order and consistency it delivers.

They have [three configs][] you can choose from: [`alphabetical`][], [`natural`][], and [`line-length`][]. I started with the alphabetical one, but it results in some odd choices, especially around the order of the different parts of intersection and union types (with TypeScript) and in switch cases. But again, because it does all the work for me, I was fine letting it have its opinions.

However, as I looked back at the docs to write this post, I decided to check out the `natural` config, and it is *chef’s kiss*. It lives up to the “perfect” part of the plugin’s name. Natural ordering, in this case, means alphabetical ordering in a way that makes sense to a human. Some examples:

```ts
// with the alphabetical config:
import { item10, item2, item4, item6, item8 } from 'module';
// with the natural config:
import { item2, item4, item6, item8, item10 } from 'module';

// with the alphabetical config:
type Status =
    | 'DEFAULTED'
    | 'HIDDEN_BY_DEFAULT'
    | 'HIDDEN'
    | 'REQUIRED';
// with the natural config:
type Status =
    | 'DEFAULTED'
    | 'HIDDEN'
    | 'HIDDEN_BY_DEFAULT'
    | 'REQUIRED';

// with the alphabetical config:
type Props = { isLoading: boolean } & ParentProps;
// with the natural config:
type Props = ParentProps & { isLoading: boolean };
```

The final config they offer is `line-length`, which is very satisfying but also impractical. Its output is quite visually pleasing, but it doesn’t help me find anything. If I want to find an import, I have to scan basically the entire list or do a text search, whereas with natural ordering, I can quickly find it based on its first letter. So my strong recommendation is to use the `natural` config, which you can do so by installing the plugin (`npm i -D eslint-plugin-perfectionist`) and adding the following lines to your `esling.config.js` file:

```js
import jsPlugin from '@eslint/js';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
// ...
export default [
    jsPlugin.configs.recommended,
    perfectionistPlugin.configs['recommended-natural'],
    // ...
];
```

Note that I also explicitly turned off all the other sorting/ordering rules I know of, which Perfectionist makes superfluous:

```js
    'import/order': 'off',
    'react/jsx-sort-props': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
```

And one last thing: the one sorting rule I still wanted that Perfectionist doesn’t provide is a rule to order the React hook dependency arrays alphabetically. Azat S, the owner of the Perfectionist repo, [explicitly said][] he doesn’t want to add that rule because he doesn’t “plan to support things specific to any tools or frameworks” (fair), but in that same Github issue, Gajus Kuizinas pointed out the [`sort-react-dependencies` rule][] from his [`eslint-plugin-canonical` plugin][], so that’s a good option for React developers.

[published a post]: {% link _posts/2025-01-13-eslint-plugin-import-with-yarn-pnp.md %}
[Perfectionist]: https://perfectionist.dev/
[ESLint `--fix` flag]: https://eslint.org/docs/latest/use/core-concepts/#rule-fixes
[three configs]: https://perfectionist.dev/configs
[`alphabetical`]: https://perfectionist.dev/configs/recommended-alphabetical
[`natural`]: https://perfectionist.dev/configs/recommended-natural
[`line-length`]: https://perfectionist.dev/configs/recommended-line-length
[explicitly said]: https://github.com/azat-io/eslint-plugin-perfectionist/issues/178#issuecomment-2265760321
[`sort-react-dependencies` rule]: https://github.com/gajus/eslint-plugin-canonical?tab=readme-ov-file#sort-react-dependencies
[`eslint-plugin-canonical` plugin]: https://github.com/gajus/eslint-plugin-canonical
