---
layout: post
title: React Compiler’s Silent Failures (And How to Fix Them)
baseline: Depending on React Compiler means knowing when it fails
credit: 'Photo by <a href="https://www.pexels.com/photo/desert-sand-with-ripples-with-night-sky-13620627/">Marjan Taghipour</a>'
splash: media/pexels-marjan-taghipour-306415692-13620627.avif
category: blog
published: true
tags: [react, typescript, javascript, react-compiler, performance, memoization]
---

I have been building highly interactive React UIs since 2017: visual editors, design tools, the kind of applications where users are dragging elements, adjusting properties in real-time, and expecting every interaction to feel as responsive as Figma or Photoshop. An unnecessary re-render can break the illusion of direct manipulation, making the experience laggy and unpleasant.

For eight years, I trained myself to think in `useMemo` and `useCallback`. I developed an internal compiler in my head that would flag any value that might cause excessive re-rendering. It was second nature.

Then React Compiler erased all of it in a matter of weeks.

## The Manual Memoization Problem

Manual memoization isn’t just tedious, it’s a cognitive tax on every component you write. You need to consider:

- Does this event handler need `useCallback`?
- Do I need to extract this into a separate `ComponentItem.tsx` file just to stabilize props in a `.map(...)`?
- Do I need to hoist this style object or wrap it in `useMemo`?
- Will this context provider trigger unnecessary re-renders downstream?

Get it wrong and you either tank performance or litter your codebase with premature optimizations. Get it right and you’ve still spent mental energy on plumbing instead of product.

React Compiler eliminates this entirely. At [Outlyne](https://outlyne.com), we’ve been running it in production for over six months. It’s become the kind of indispensable tool I can no longer imagine working without, like hot module replacement or automatic code formatters.

I don’t think about memoization anymore. Those grooves from years of habit have been wiped smooth.

## The Silent Failure Problem

That’s the good news. Here’s what surprised me: when React Compiler can’t compile a component, it fails silently.

The philosophy makes sense. The compiler exists to make your code work *better*, not to make it work at all. If it can’t optimize something, it falls back to standard React behavior. Your app still runs.

But now that I no longer manually memoize anything, it’s become clear that manual memoization is a form of code debt. It’s unnecessary complexity that makes your component logic harder to follow, while dependency arrays are a maintenance burden. And in a world with React Compiler, it’s premature optimization, [the root of all evil.](https://www.laws-of-software.com/laws/knuth/) I don’t want it anywhere in my codebase.

Which means I now depend on the compiler successfully processing certain components, particularly the ones powering high-frequency interactions or managing expensive context providers. If it silently fails on those, the user experience degrades and can even break some UXs entirely. I discovered this with [our homepage](https://outlyne.com) typewriter animation.

<p><video width="100%" autoplay loop muted playsinline>
  <source src="/media/outlyne-typewriter-animation.mp4" type="video/mp4">
</video></p>

We refactored it from SSE to vanilla `fetch`, adding a try/catch with nullish coalescing in the try block. That made it incompatible with React Compiler, resulting in a weird re-render loop where the ref callback for the input was being thrashed.

<p><video width="100%" autoplay loop muted playsinline>
  <source src="/media/outlyne-typewriter-animation-broken.mp4" type="video/mp4">
</video></p>

I realized that I needed a way to know when compilation fails, and I needed it to break my build.

## The Undocumented ESLint Rule

After digging through the `react-compiler-babel-plugin` source code, [I found the solution:](https://github.com/facebook/react/blob/3640f38a728f3a057649cf7aec65a6ce14c2eac0/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts#L1041-L1049)

```js
    case ErrorCategory.Todo: {
      return {
        category,
        severity: ErrorSeverity.Hint,
        name: 'todo',
        description: 'Unimplemented features',
        preset: LintRulePreset.Off,
      };
    }
```

The rule name is `todo`, so in most configs (unless you’ve configured `eslint-plugin-react-hooks` with a different name), the full name of the rule is `react-hooks/todo`. It’s not documented anywhere I could find (e.g. [these React Compiler ESLint rules](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#flat-config-eslintconfigjsts-1)), but enabling it as an error will break your build on any component that has syntax the compiler can’t yet handle.

With that in place, in my homepage example, this code:

```tsx
    const handleGeneration = useEffectEvent(async (fetchURL: string) => {
        try {
            const response = await fetch(fetchURL);
            const data = (await response.json()) as { response?: string };
            const finalResult = (data.response ?? '').trim();
            const prompt = getPromptFromResponse(finalResult);
            if (!prompt) {
                handleError();
            } else {
                setPromptSuggestion(prompt);
                setEventSourceURL('');
            }
        } catch (error) {
            logError('Home fetch error', error);
        }
    });
```

Results in this lint error:
```
/outlyne/app/components/Home.tsx
  86:34  error  Todo: Support value blocks (conditional, logical, optional chaining, etc) within a try/catch statement

/outlyne/app/components/Home.tsx:86:34
  84 |             const response = await fetch(fetchURL);
  85 |             const data = (await response.json()) as { response?: string };
> 86 |             const finalResult = (data.response ?? '').trim();
     |                                  ^^^^ Support value blocks (conditional, logical, optional chaining, etc) within a try/catch statement
  87 |             const prompt = getPromptFromResponse(finalResult);
  88 |             if (!prompt) {
  89 |                 handleError();
```

Here’s how to set it up:

```js
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    // ...
    rules: {
      // https://github.com/facebook/react/blob/3640f38/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts#L807-L1111
      'react-hooks/todo': 'error',
      // other useful rules:
      'react-hooks/capitalized-calls': 'error', // avoid calling capitalized functions (should use JSX)
      'react-hooks/hooks': 'error', // largely reimplements the "rules-of-hooks" non-compiler rule
      'react-hooks/rule-suppression': 'error', // validates against suppression of other rules
      'react-hooks/syntax': 'error', // validates against invalid syntax
      'react-hooks/unsupported-syntax': 'error',// `warn` by default, use `error` to break the build
      // ...
    }
  },
];
```

Turn this on and you’ll be surprised how many components fail. Before I learned the patterns React Compiler doesn’t yet support, I had more than a hundred components that couldn’t be compiled.

## What Breaks the Compiler

The most common unsupported pattern I ran into: **destructuring props and then mutating them.**

This breaks compilation:

```jsx
function MyComponent({ value }) {
  // If value is undefined, fall back to state
  value = value ?? someStateValue;
  
  // Or normalize the value
  value = normalizeValue(value);
  
  // Use value...
}
```

Thankfully, the fix is clean and arguably an improvement, just create a new variable to avoid mutating the destructured prop:

```jsx
function MyComponent({ value: valueFromProps }) {
  const value = valueFromProps ?? someStateValue;
  // Use value...
}
```

Another limitation: **try/catch blocks with any complexity.** If your component does async work with try/catch, you can’t use:

- Conditionals in the `try` or `catch` block
- Ternaries, optional chaining, or nullish coalescing
- `throw` statements

The “no conditionals” part of this is a real pain. More often than not, when I have a component doing something that could throw, I have some conditional logic in either the try or catch block.

```jsx
try {
  const response = await fetch(url);
  if (response.ok) { // Breaks compilation
    setResponse(await response.json());
  } else {
    setError(`Error ${response.status}`);
  }
} catch (error) {
  setError(`${error}`);
}
```

These are all ostensibly temporary limitations, as suggested by the name (“todo”) and description (“Unimplemented features”) of the lint rule. I’m sure most if not all of them will be resolved. Though I should mention that the `Support ThrowStatement inside of try/catch` todo error is [preceded by this comment:](https://github.com/facebook/react/blob/b85cf6af3de99dce3674dadebcc1493b77a64606/compiler/packages/babel-plugin-react-compiler/src/HIR/BuildHIR.ts#L279-L290)

```js
/*
 * NOTE: we could support this, but a `throw` inside try/catch is using exceptions
 * for control-flow and is generally considered an anti-pattern. we can likely
 * just not support this pattern, unless it really becomes necessary for some reason.
 */
```

So maybe not all of them? Ironically, I’ve worked around the `Support value blocks…` error by relying on unsafe property access inside the `try` block, implicitly depending on a thrown exception for control flow.

Regardless, in the meantime, I caught myself committing these limitations to memory, much as I had done previously with the best practices I internalized around optimization techniques to prevent re-rendering in React. That is definitely not the outcome I want.

## Leverage Linting

This is why the ESLint rule is so valuable: it prevents me from having to memorize these patterns. But some components use patterns I’m not willing to complicate just to appease the compiler.

For those, I explicitly disable the rule:

```jsx
/* eslint-disable react-hooks/todo */
function NonCriticalPathComponent() {
  // This component doesn't need to be compiled for the app to perform well, and I'm not
  // willing to refactor the try/catch logic
}
```

This approach gives me the best of both worlds:

- Critical components *must* compile or the build breaks
- Non-critical components can use whatever patterns make the code clearest
- I don’t think about memoization at all

## Should You Use React Compiler?

Absolutely! Especially if you’re building interactive UIs where performance matters. The cognitive relief alone is worth it.

But go in knowing that compilation will fail silently by default. If you have critical code paths where the components must be properly memoized, set up the ESLint rule and let your build break. Then make conscious decisions about which components need compilation and which don’t.

The limitations are temporary. The change in how you build UI is permanent.
