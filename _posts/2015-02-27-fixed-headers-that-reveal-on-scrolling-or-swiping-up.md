---
layout: post
title: Fixed headers that reveal on scrolling or swiping up
baseline: Exploring and building a mobile-first solution for optimal reading UX
credit: "Poe Cheung’s “Looking for the sun”"
splash: "media/poe-cheung-looking-for-the-sun.jpg"
category: blog
published: true
tags: [ux, performance, webdev, mobile, javascript]
---

I like Mobile Safari’s method of hiding and showing the address bar. Most of your time on a website, you don’t need that bar, and it takes up valuable screen real estate and is a distraction. But sometimes you do need it, and if you scroll the page upwards, as if reaching up towards that address bar, it reveals itself to you. This is not entirely intuitive, but once discovered, it seems natural.

The UX use case for such a paradigm for a website nav or menu bar is even more compelling, I think; if your navigation bar is originally at the top of the page, and then stays up there as you scroll, the user will of course start scrolling the page back up if they want to go find it. So, the approach of sites like Medium, to hide the navigation bar as you scroll but then reveal it when you scroll back up, makes a lot of sense. And I wanted to create a similar effect on this site, but with a couple modifications. First, on Medium, the functionality is unavailable on mobile, which is a shame. Most content is actually longer on mobile (fewer characters per line and all), so it is easier for the user to get lost, and there is no scrollbar a user can grab to scroll the page quickly, nor any keyboard shortcuts (like command-up or shift-space) or keys (home, page up) to help them. On iOS, there is the tap on the top of the page trick, which is super helpful, but I suspect also largely unknown by its users. Medium’s solution is to just keep the menu bar always present on mobile, but that also sucks because of the limited screen real estate people already have to deal with.

So I made [affixing-header][], a package available via npm or old-fashioned browser `<script>`. It exposes a single function that takes a DOM node and gives it the ideal behavior I described above, even on mobile. This behavior is enabled by [onscrolling][], another, more low-level, package I released, and which handles the magic of creating a mobile-friendly, high-performance `onscroll`-style event handler. It uses `requestAnimationFrame` to determine how often to trigger any event listeners, and detects the beginning of a scroll via either the traditional `onscroll` event or via `touchmove` on the body element.

Hope some of you find it useful! And if you do end up using it for anything, no matter how small, I’d love to know about it! You can do so via this post or in GitHub.

[affixing-header]: https://github.com/acusti/affixing-header
[onscrolling]: https://github.com/acusti/onscrolling
