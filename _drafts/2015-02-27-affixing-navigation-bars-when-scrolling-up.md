---
layout: post
category: blog
published: false
title: Affixing navigation bars when scrolling up
---

I like Mobile Safari’s method of hiding and showing the address bar. Most of your time on a website, you don’t need that bar, and it takes up valuable screen real estate and is a distraction. But sometimes you do need it, and if you scroll the page upwards, as if reaching up towards that address bar, it reveals itslef to you. This is not entirely intuitive, but once discovered, it seems natural.

The UX use case for such a paradigm for a website navigation or menu bar is even more compelling, I think. Because if your navigation bar is originally at the top of the page, and then stays up there as you scroll, the user will of course start scrolling the page back up if they want to go find it. So, the approach of sites like Medium, to hide the navigation bar as you scroll but then reveal it when you scroll back up, makes a lot of sense. And I wanted to create a similar effect on this site, but with a couple modifications. First, on Medium, the functionality is unavailable on mobile, which is a shame. Most content is actually longer on mobile (fewer characters per line and all), so it is easier for the user to get lost, and there is no scrollbar a user can grab to scroll the page quickly, nor any keyboard shortcuts (like command-up or shift-space) or keys (home, page up) to help them. On iOS, there is the tap on the top of the page trick, which is super helpful, but I suspect also largely unknown by its users. So, Medium’s solution is to just keep the menu bar always present on mobile, but that also sucks, because of the limited screen real estate people already have to deal with.

So I made that works how I would want it to work, and is entirely mobile-friendly.