---
layout: post
category: blog
title: Towards a more perfect link underline
baseline: "progress in underline text-decoration in Safari and iOS"
splash: "media/new-yorker-link-underlines.png"
tags:
  - typography
  - readability
---

I became interested in trying to create the ideal text underline in CSS after reading an [excellent post][medium-post-underlines] about it on (and about) Medium.

In that post, Marcin Wichary offers a list of goals for his ideal link underline:

> So, the ideal technological solution would allow us to:
>
> - change the width of the line (with additional half-pixel/retina support),
> - change the distance from the text,
> - change the color (even if just to simulate thinner width by using lighter grays instead of black),
> - clear the descenders,
> - (perhaps) have a separate style for visited links.

Wichary goes on to detail Medium’s solution, which uses a CSS `background-gradient` to fulfill the first three goals in his list, but does not separate character [descenders][] (e.g. the part of a letter that descends below the baseline) from the underline.

Since the writing of that post, Apple released Safari 8.0 and Safari for iOS 8, which modifies the rendering of the venerable `text-decoration: underline` property to fulfill Wichary’s fourth goal by clearing the descenders. I grabbed a screenshot of Wichary’s ideal vision with the way the same word as a link is rendered in Safari 8.0:

![“parapsychologists” as platonic ideal and reality]({{ site.base_url }}/media/medium-example-with-native-underline.png)

You can see another example of the “native” Safari underline in the screenshot at the top of the page, from [The New Yorker][] (with modified text content to illustrate descenders). Overall, the underline is much thicker than Wichary’s ideal and sits too close to the text for my comfort. But most damningly to my mind, the underline does not change weight to adapt to the weight of the font, leading to unfortunate mismatches like with the `:hover` style on [Angel List][]:

![Angel List :hover underline]({{ site.base_url }}/media/angellist-underlines.png)

In that example, those fat underlines are sitting right underneath text rendered with `font-weight: 100`. All of which is to say, there is still room for custom text underlines to improve readability and aesthetics of links in the latest Safari.

With that in mind, I should make it clear that I have been frequently delighted thanks to the simple change, particularly because any app using a WebView automatically gets the newly cleared descenders. The current situation is far from my platonic idea, but it is also a significant improvement. Underlined text in my mail applications and elsewhere looks cleaner, more readable, and less cluttered.

But if you still desire the extent of control that Wichary hopes for, give the `linear-gradient` background trick a try. Accompanied with four `1px` text-shadows positioned around the link text in the color of your background, you even get a nice descender clearing effect. And you can vary the weight and distance of the underline depending on the weight of the text. I have been able to use that technique to nice effect in my [Pesto stylesheet][], which I use for previewing Markdown files in apps such as [Marked 2][]. You can see Pesto with its custom underlines in effect on my [resume][]. The technique has some gotchas (browser inconsistencies in retina vs non-retina and ugliness with text selection), but I’ve been able to address all of the issues that I uncovered. Here’s the final SCSS that I settled on as of this writing:

```scss
a {
	color: $color-accent;
	text-decoration: none;
	// Underline via gradient background
	background-image: linear-gradient(to bottom, transparent 49%, $color-accent 50%);
	background-repeat: repeat-x;
	background-size: 1px 1px;
	// For non-retina screens in Safari, gradient background needs 2 pixels of height to show any underline
	@media (-webkit-max-device-pixel-ratio: 1.49),
	(max-resolution: 143dpi) {
		background-size: 1px 2px;
	}
	background-position: 0 90%;
	// Clear descendors from underline
	text-shadow: 1px 0 white, 2px 0 white, -1px 0 white, -2px 0 white;
	cursor: pointer;
	outline: 0 none;
	// Style selected links (or else text-shadow makes it look crazy ugly)
	@include selection {
		background-color: lighten($color-accent, 25%);
		color: $color-text-body;
		text-shadow: none;
	}
	&:hover {
		color: darken($color-accent, 11%);
		background-image: linear-gradient(to bottom, transparent 49%, darken($color-accent, 6%) 50%);
	}
}
h1, h2, h3, h4, h5, dt, strong, b {
	a {
		background-size: 1px 2px;
		background-position: 0 91%;
	}
}
```

[medium-post-underlines]: https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9
[descenders]: https://en.wikipedia.org/wiki/Descender
[The New Yorker]: http://www.newyorker.com
[Angel List]: https://angel.co/jobs
[Pesto stylesheet]: https://github.com/acusti/Custom-Marked-Styles
[Marked 2]: http://marked2app.com
[resume]: {{ site.base_url }}/resume/
