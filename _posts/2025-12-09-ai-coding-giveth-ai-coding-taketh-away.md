---
layout: post
title: How AI Coding Agents Hid a Timebomb in Our Production App
baseline: When a deleted comment led to deleted code and React’s Activity component masked the infinite recursion
credit: ''
splash: media/bookshelf-organized-by-color-perfectionist.jpg
category: blog
published: true
tags: [coding-agent, typescript, javascript, react]
---

Crash reports started trickling in: users loaded sites, clicked around, edited content. Everything seemed normal, right up until their browser froze and died. Behind the scenes, an infinite React tree was quietly growing in memory, and React 19’s `<Activity>` component was unintentionally keeping it alive long enough to hide the problem. Here’s how an AI coding agent and a deleted comment conspired to bury a timebomb in our codebase.

I’m the primary software developer behind [Outlyne](https://outlyne.com), an AI-powered website builder I’ve been building for a year and a half with my co-founder, a product designer. The primary UI is a Figma-like canvas with the pages of your website lined up horizontally:

![Outlyne Design UI Screenshot]({{ site.base_url }}/media/outlyne-design-ui.avif)

Each page has a header and footer, and each header and footer render an HTML popover that opens as a sidebar on the right so that user can choose between header and footer variants and decide what content to include:

![Outlyne Footer Sidebar UI Screenshot]({{ site.base_url }}/media/outlyne-footer-sidebar.avif)

The variants are rendered as scaled-down versions of the actual header and footer components, so the page’s header and footer each render a UI that itself renders more headers and footers with different props. That’s inherently recursive, which is fine as long as the recursion bottoms out. But if a preview ever renders the editor UI, which then renders previews again, the recursion never stops, and you end up in an infinite render loop.

All parts of a webpage in Outlyne are rendered by default with only the functionality of the component as it exists on the published page. And editing UI is imported via `React.lazy` and `Suspense`, and are only rendered when in the editor UI. This means they don’t even get included in the JS bundle for published pages. In our preview mode and in the published page, the page and all of its parts are rendered as `readOnly`, meaning no editor UI. So when I implemented the UI and added the part where we render the previews of different versions of the same component, I set `readOnly={true}` for the previews. This meant they render only the content, no editing UI. Perfect! Easy-peasy. But also important, so let’s add a comment warning that “if this is false, it causes infinite recursion”:

![Outlyne GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit.png)

## AI Coding Agents

We use AI coding agents. We’d be crazy not to. They’ve been an enormous productivity multiplier for us, especially in routine refactors and UI cleanup work, and it’s incredibly tempting (and productive) to just trust the changes they make.

A couple of months ago, we redesigned and improved the UI for editing headers and footers, things moved around a bit and we got a nice new `PreviewWrapper` component. And the AI removed my comment, I guess as cleanup? Maybe because “infinite recursion” sounds like no big deal? Well anyways, 353 changed lines, LGTM, merge it.

![Outlyne Footer Editor Redesign GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit-2.png)

Once that comment disappeared, the AI no longer had any signal that readOnly was a structural safety constraint rather than just another prop. From that point forward, the code looked “safe to simplify.”

Sure enough, four weeks later, we added a cookie consent feature for websites that have cookies and want to be GDPR compliant, which meant updating the footer to pass a new `cookieSettings` prop. While in there, we optimized the previews to use static empty values for some of the props that don’t matter in a preview. And oh, the LLM decided to remove that readOnly line. With no comment warning about infinite recursion anymore, I suppose it looked safe to remove.

![Outlyne Cookie Settings GitHub Commit Screenshot]({{ site.base_url }}/media/outlyne-footer-github-commit-3.png)

## The app kept working

We deployed this change. And the app… kept working. Users could load pages, click around, edit their websites. Everything seemed fine. For a few minutes, at least. Then reports started coming in: browsers were freezing and crashing.

When I opened the app to investigate, I expected an immediate crash. Instead, it loaded normally. I could navigate, open popovers, edit content. The app was completely responsive and usable. It took several minutes before my browser finally gave up and crashed.

This shouldn’t have been possible. We had popovers rendering infinite trees of components, each footer preview rendering another footer, which rendered another preview, which rendered another footer, and so on. Normally, React would try to render that entire tree immediately and the app would crash on load. But React 19.2’s new [`<Activity>` component](https://react.dev/reference/react/Activity) changes how hidden UI is rendered. In our case, it didn’t just hide the UI—it hid the bug.

We wrap our editing popovers in `<Activity mode={popoverState === 'closed' ? 'hidden' : 'visible'}>`, so when the popover is closed on initial load, the entire editor UI is rendered in hidden, low-priority mode. React still renders it, but very slowly, spread out over time, and without effects or DOM commits. That meant the infinite tree was quietly expanding in memory in the background while the visible UI stayed perfectly responsive. The bug was there immediately, but `<Activity>` shielded the user from seeing it until the browser finally ran out of memory minutes later.

`<Activity>`’s extremely efficient implementation of component pre-rendering had masked the timebomb we’d introduced into our codebase.

## Finding the culprit

The debugging process was a nightmare. The infinite rendering was all happening in memory. No DOM nodes, no visual artifacts, nothing to grab onto. Just the browser slowly consuming RAM until it crashed. And it wasn’t an immediate crash, which made things worse: I’d load the page, poke around, everything looked normal… then 2–3 minutes later, the tab would blow up.

Chrome’s debugger would occasionally pause automatically with “Paused before potential out-of-memory crash.” Every time, it stopped in the same place: [deep inside Motion’s code](https://github.com/motiondivision/motion/blob/main/packages/framer-motion/src/projection/node/create-projection-node.ts#L416) where it creates projection nodes.

That sent me down a rabbit hole for days. The stack traces were 10,000 parents deep and completely anonymous. Motion looked guilty. I became convinced something about how we were rendering components was causing it to generate an invalid projection tree and then repeatedly attach to it, maybe because it was trying to attach to an unmounted DOM node, maybe because we were keying components based on editing state.

I even managed to prevent the crash by patching Motion locally and adding guards to stop the runaway projection node creation. But it was becoming obvious the projection nodes were a symptom, not the cause.

The real clue came from combing through the massive Motion ancestry path at the point the browser was about to run out of memory. Buried in the chain were a few `layoutId` values I recognized from the footer editor component tree. That gave me my first real lead.

On a hunch, I tried removing the `<Activity>` wrapper from the page footer editor popover. The app immediately crashed on load. That was the turning point. Without Activity’s low-priority hidden rendering, the infinite recursion revealed itself instantly.

Easy enough from there to trace back through the history of commits touching the footer editor file and find where the `readOnly` prop had been removed.

## Lessons and Learnings

My biggest takeaway from this experience is that comments are no longer a reliable way to ensure critical logic is maintained. In a codebase edited by multiple humans and AI coding agents, important comments will get orphaned or deleted during unrelated restructuring. I wrote that comment about infinite recursion, saw it as important enough to document, but didn’t take the next step of writing a test—even though it only takes about 20 lines:

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

I’ve always been somewhat cavalier about testing. I write tests when they’re useful—especially for utils where TDD actually helps me implement the logic—but I’ve never been rigorous about testing everything. That worked fine when I was the only one touching the code, or when changes were deliberate and careful.

But AI coding agents and vibe coding change the calculus. When you realize something is important enough to warrant a comment like “if this is false, it causes infinite recursion,” that’s the moment to catch yourself and write a test instead. Comments are documentation; tests are enforcement. The comment got deleted, then the prop. Nobody noticed either deletion. A test would have failed.
