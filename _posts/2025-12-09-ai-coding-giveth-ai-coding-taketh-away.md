---
layout: post
title: AI Coding Giveth, AI Coding Taketh Away
baseline: A cautionary tale on the dangers of relying on AI coding agents and an aside on the power of React Activity
credit: 'A room designed by Jill Goldberg of Hudson Interior Designs. (Michael J Lee)'
splash: media/bookshelf-organized-by-color-perfectionist.jpg
category: blog
published: true
tags: [coding-agent, typescript, javascript, react]
---

We talk endlessly about the massive upside and correspondingly massive downside of coding agents, but the conversation is almost always hypothetical. Today I bring you an entirely concrete, non-theoretical, discussion of the same. First, some context:

I’m the primary software developer behind [Outlyne](https://outlyne.com), an AI-powered website builder I’ve been building for a year and a half with product designer (and co-founder and collaborator) [Jeremy Willer](https://willerdesign.com). The primary UI is a Figma-like canvas with the pages of your website lined up horizontally:

![Outlyne Design UI Screenshot]({{ site.base_url }}/media/outlyne-design-ui.avif)

Each page has a header and footer, and each header and footer render an HTML popover that opens as a sidebar on the right so that user can choose between header and footer variants and decide what content to include:

![Outlyne Footer Sidebar UI Screenshot]({{ site.base_url }}/media/outlyne-footer-sidebar.avif)

The variants are rendered as scaled down versions of the actual header and footer components at those sizes. This means that the page header and footer render a UI inside them that itself renders variants of the header and footer, but with different props. Recursive rendering! What could go wrong?

All parts of a webpage in Outlyne are rendered by default with only the functionality of the component as it exists on the published page. And editing UI is imported via `React.lazy` and `Suspense`, and are only rendered when in the editor UI. This means they don’t even get included in the JS bundle for published pages. In our preview mode and in the published page, the page and all of its parts are rendered as `readOnly`, meaning no editor UI. So when I implemented the UI and added the part where we render the previews of different versions of the same component, I set `readOnly={true}` for the previews. This meant they render only the content, no editing UI. Perfect! Easy-peasy. But also important, so let’s add a comment warning that ”if this is false, it causes infinite recursion”:

![Outlyne GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit.png)

## AI Coding Agents

Jeremy and I use AI coding agents. We’d be crazy not to. Jeremy is a designer, and while he knows HTML and CSS inside and out, he only knows enough to be dangerous when it comes to JavaScript and React. For him, AI coding agents make it possible for him to do so much more without bugging anyone else on the team, which has made it possible for him to create a huge amount of new UI and features end-to-end. A **huge** amount. Like, 5-digits-of-lines–of-code huge. Buuuuut we require that all code be reviewed before we can merge it and ship it. And the PRs coming out of Jeremy’s collaborations with the AI coding agent (generally Claude Sonnet 4 or 4.5) were generally between 5,000–10,000 lines of code. One such PR took me two weeks of review and cleanup to get production ready, at which point we realized we had a problem.

Our new policy is that any generated code that can’t be fully understood by the coder who is committing it goes in a branch and is marked as such. If it’s a small amount, someone who can understand the code reviews it, makes any necessary changes, and merges it. If it’s a large amount, that branch becomes a prototype branch that I can use as a reference for implementing the actual feature.

One of the great things about React is that it’s enabled Jeremy, a designer who knows HTML and CSS, to become an extremely productive front-end developer. He can review changes to components and props and verify that things look correct. So when he recently redesigned and improved the UI for editing headers and footers with the help of the AI, things moved around a bit and we got a nice new `PreviewWrapper` component. And the AI removed my comment, I guess as cleanup? Maybe because “infinite recursion” sounds like no big deal? Well anyways, 353 changes lines, LGTM, merge it.

![Outlyne Footer Editor Redesign GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit-2.png)

Four weeks later, we added a cookie consent feature for websites that have cookies and want to be GDPR compliant, which meant updating the footer to pass the new `cookieSettings` prop. While in there, we optimized the previews a bit to use static empty values for some of the props that don’t matter in a preview. And oh, the LLM decided to remove that `readOnly` line. Probably wasn’t doing anything anyways? I don’t see any comments about it, so must be safe to remove.

![Outlyne Cookie Settings GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit-3.png)

## An aside on the power of React’s `<Activity>` component

Our app was deployed with several popovers rendering a tree of components that infinitely rendered its own self, and yet it continued to function after loading until the in-memory load of the infinite component tree eventually exhausted the browser’s memory, which would take a few minutes. This is actually quite remarkable. The magic lies in React 19.2’s new [`<Activity>` component](https://react.dev/reference/react/Activity), whose primary purpose is to allow you to hide and show different parts of your app without needing to actually unmount them so that you don’t lose their internal state and don’t incur the cost of recreating the component tree from scratch when it is shown again. But in our case, the part of `<Activity>` that made the app continue to work is our use of it for [“pre-rendering content that’s likely to become visible”:](https://react.dev/reference/react/Activity#pre-rendering-content-thats-likely-to-become-visible)

> When an Activity boundary is `hidden` during its initial render, its children won’t be visible on the page — but they will *still be rendered,* albeit at a lower priority than the visible content, and without mounting their Effects.

We wrap the editing popovers in `<Activity mode={popoverState === 'closed' ? 'hidden' : 'visible'}>{...}</Activity>`, where `popoverState` represents the [`event.newState`](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) of the popover. Both the popover and the Activity are hidden during initial render, so it was rendered at a low-priority, scheduled over time, such that the app continued to function and seemed responsive and usable for minutes before the low-priority in-memory rendering finally exhausted the browser’s available memory.

## Back to the main story

But in our case, `Activity`’s extremely efficient implementation of component pre-rendering masked the timebomb that had been introduced into our app, so we might’ve been better served by a less effective implementation. In fact, it took removing the `<Activity>` wrapper from the page footer editor popover for me to finally figure out that the footer was the culprit, because after that was removed, the app of course started immediately crashing on load. And I only thought to try that because I was pursuing a red herring, in which I thought that I may have been running into an incompatibility between `<Activity>` and whatever magic and optimizations are used by [motion](https://motion.dev) to track component visibility and layout changes and such.


## Lessons and Learnings

My biggest takeaway from this experience is that comments are now, more than ever, not a reliable way to ensure an important piece of logic or behavior is maintained. The proliferation of entities editing our code in this new era make it more likely than ever that important comments will be orphaned or deleted out-right during unrelated code restructuring. The solution, of course, is tests. Ensuring that the `readOnly` prop is set to true when the footer VariantPicker renders its footer previews is pretty straightforward:

```tsx
// mock PageFooter to capture its props
const mockPageFooter = vi.hoisted(() => vi.fn(() => null));

vi.mock('~/components/PageFooter.tsx', () => ({
    default: mockPageFooter,
}));

const mockProps = {...};

afterEach(() => {
    cleanup();
    mockPageFooter.mockClear();
});

describe('VariantPickerFooter', () => {
    it('renders PageFooter components with readOnly: true on design tab', () => {
        render(<VariantPickerFooter {...mockProps} />);

        const expectedCount = FOOTER_VARIANT_CLASS_NAME_SCHEMA.options.length;

        // verify mock calls match the expected count and all have readOnly: true
        expect(mockPageFooter).toHaveBeenCalledTimes(expectedCount);
        mockPageFooter.mock.calls.forEach((call) => {
            const [props] = call as unknown as [ComponentProps<typeof PageFooter>];
            expect(props.readOnly).toBe(true);
        });
    });
});
```
