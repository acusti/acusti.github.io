---
layout: post
title: GitHub and readable light text on dark backgrounds
baseline: optimizing type for Chrome and Safari
tags: [typography, accessibility]
---

While browsing the [Issues](https://github.com/videojs/video.js/issues) page for [VideoJS](http://www.videojs.com) on GitHub today, I was having trouble reading the text of the inline labels that appear next to the titles of some issues. These labels have white text on colourful backgrounds, and in Chrome and Safari, that white text looked blurred with poorly defined edges that bled into each other, because they are being rendered with subpixel antialiasing. A very easy fix is to specify `-webkit-font-smoothing: antialiased;` for all text that will be display as light on black.

I applied that CSS to the Issues page and took before and after screenshots (in Chrome Version 30.0.1588.0 canary). Toggle  the “apply `-webkit-font-smoothing: antialiased`” control to see how it is rendered with and without subpixel antialiasing.



John Gruber [linked](http://daringfireball.net/linked/2012/11/14/font-smoothing) to [a UsabilityPost piece](http://www.usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/) a while back that asks web developers to stop ab/using `-webkit-font-smoothing: antialiased;`

And in the piece Gruber linked to, Dmitry Fadeyev observes that  dark text on light backgrounds benefits significantly from the default `subpixel-antialiased` rendering of Chrome and Safari:

> The sharpness of subpixel rendered text makes long portions of body text more readable. Light text on dark background, at least on OS X, is the opposite. Subpixel text tends to spill out and make the font appear bold. Here, the antialiasing mode actually becomes useful in helping refine the lines.

[Daring Fireball](http://daringfireball.net) is a good example of that second use case.

A final note: the distinction between renderings becomes pretty much moot on high-density (retina) displays. Both subpixel-antialiased and antialiased are crisp and highly legible. But if you’re building a website today and you’ve decided you no longer care about the UX for readers with non-retina displays, I entreat you to reconsider.
