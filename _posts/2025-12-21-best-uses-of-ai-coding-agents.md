---
layout: post
title: Best Uses of AI Coding Agents as of the End of 2025
baseline: The strengths and weaknesses of frontier models and tools
credit: 'Photo by <a href="https://www.pexels.com/photo/desert-sand-with-ripples-with-night-sky-13620627/">Marjan Taghipour</a>'
splash: media/pexels-marjan-taghipour-306415692-13620627.avif
category: blog
published: true
tags: [coding, coding-agents, javascript, typescript]
---

I have been using AI coding agents heavily to amplify the impact and output of our two-person product team at [Outlyne](https://outlyne.com). My co-founder, [Jeremy Willer,](https://willerdesign.com) is a brilliant product designer and highly capable traditional web developer (HTML and CSS), while I’m a full-stack developer/software engineer. Over the last decade, React and JSX (TSX now) have enabled Jeremy to become a productive contributor to our Typescript codebase, and when AI coding agents became [available and usable in Zed,](https://zed.dev/blog/fastest-ai-code-editor) our preferred code editor, it was like we suddenly had an extremely productive junior engineer available around the clock to take on any coding task that previously would’ve fallen to me.

You’re almost certainly already familiar with this story. A week later, I was looking at a backlog of PRs to review totalling more than 20K changed lines of code, and the overall code quality of the PRs was quite low. Claude Sonnet 3.7 turned out to be absolutely unrivaled at the ability to generate “working” code, and absolutely awful at determining how to structure that new code to be maintainable and to minimize bugs. My productivity ground to a halt as I spent the next two weeks just reviewing and fixing PRs and I was miserable and heading fast towards burnout. [Bugs made it into production]({% link _posts/2025-12-09-how-ai-coding-agents-hid-a-timebomb-in-our-app.md %}) and wound up costing me weeks of debugging.

We quickly realized that we could use the agents to put together feature prototypes and try them out and gather feedback, but that we absolutely couldn’t use them to blindly generate PRs intended for deployment. Note that the word “blindly” there is very much intentional: my fundamental rule is that all code must be seen (reviewed) by a human who understands what it is doing. And we also realized that working through a plan/spec before starting on a task was essential.

## Claude (Sonnet|Opus) 4.5

The agents have come a long way since then. Claude Sonnet 4.5 (and Opus 4.5 when needs demand it) is still unrivaled at the ability to generate code, but it has improved its instincts towards maintainability, and we have substantially improved our `AGENTS.md` rules to steer it towards our best practices and away from common mistakes, making the output easier to review and merge. We use it heavily to plan out features and rearchitectures and migrations, storing them as markdown files in a root `plans/` folder in our repo.

We also use it for implementing distinct tasks in those plans, or for simple one-off coding tasks we can describe with enough detail directly in the prompt, and while I rarely if ever have been able to one-shot anything of any significant complexity with a result to my satisfaction, claude can usually get 90% of the way there. But I’ve been profoundly disappointed when I ask claude to review any code. It rarely finds any important issues and more often than not ends with baseless claims on how “production-ready” the code is, and the issues it does raise are generally some combination of marginal in scope and misguided.

## OpenAI Codex

A couple of months ago, I was persuaded by Peter Steinberger’s [“Just Talk To It” blog post](https://steipete.me/posts/just-talk-to-it) to try out the `codex` CLI. Coming from `claude`, I was genuinely perplexed by Peter’s enthusiasm. I was frequently finding myself asking codex to do something clear and straightforward, checking in on something else in the meantime, going back to the CLI and discovering that codex had done some thinking, described a plan with three bullet points, told me it was _going to start on the plan,_ then… nothing. I kept having to say “go ahead” or “continue” and it was proving quite frustrating. I tried queueing up “commit and continue” commands like Peter recommends in that post, but I was never able to get `codex` able to git commit (some kind of permission issue), despite spending too long asking codex and than ChatGPT to help me resolve the issues. I still regularly see `/Users/andrew/.zlogin:9: nice(5) failed: operation not permitted` in codex’s output.

All that said, I have very much come to appreciate `codex` (mostly using `gpt-5.1-codex-max`, not `gpt-5.2-codex`). It has never told me that a PR is “production-ready”, nor does it constantly blow smoke up my ass. It’s much more reserved with praise and enthusiasm. It just feels like a more serious coding partner, especially in contrast to claude’s [genius-level golden retriever on acid.](https://www.youtube.com/shorts/ZxXGi2_5Pz0) I don’t use it as often for pure coding tasks, because I still find there’s more friction in the process. However, it occurred to me at some point that the more serious nature of codex could lend itself to more effective code review. Plus `codex` has a nice UI accessed via the `/review` slash command that lets you review the current branch “PR-style” (against the base branch of your choosing), uncommitted changes, or a specific commit.

So I tried it out and holy crap. It’s sooooooo much better than claude or gemini. Watching it go through the code changes is a trip. It will say _I'm reviewing `SectionContentEditor` and related hooks for handling undefined data safely, and considering stale data risks from `useEffect` dependencies and `useEffectEvent` usage. I'm also checking event schema changes, especially optional fields affecting migrations, and assessing whether materializers and tests properly incorporate new event fields like `websiteId`.`_ Leading me to say _thank god someone is paying attention._

![Example of a codex review]({{ site.base_url }}/media/codex-review-screenshot.avif)

## Google Gemini

I still haven’t given gemini a fair shot. When Antigravity was announced and I saw that it has a built-in Chrome browser, I was stoked. So I tried it out and… it works ok. but I’ve tried using it to debug multiple in-browser issues and all three times, it failed to identify or fix the issue, and the editor was so buggy that I haven’t returned to it. For web dev, I think having a built-in browser that the agent can use as a tool is a huge deal, so I’m bullish long-term on Antigravity (and other tools like [Tidewave](https://tidewave.ai)).

I’ll dig back into those tools soon and write up my experiences in a future post. Beyond that, I just don’t have a real reason to try gemini out. My co-founder has tried it and prefers it somewhat over claude, crediting it specifically with responding to prompts with working code minus the exuberant excess of claude, but I’ve gotten refined enough with my prompts and comfortable enough with my usage that I know how to keep claude from going off the rails.

So that’s my current usage of AI coding agents. No doubt it will be different in a few months. I’m even of the suspicion (unconfirmed) that `gpt-5.2-codex` is somewhat less robust of a code reviewer than `gpt-5.1-codex-max` based on how quickly it finishes review. There are less scenarios it seems to consider in its thinking output, which makes me worried. But I have only used it for a few days, so it’s early yet for me to make a judgement. Regardless, the point is that this is changing at a truly unprecedented pace. Hang on for the ride!
