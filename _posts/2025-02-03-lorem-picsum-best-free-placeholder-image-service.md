---
layout: post
title: Lorem Picsum Is My Favorite Free Placeholder Image Service
baseline: A shout out to the simple and excellent picsum.photos service, plus now I won’t forget the URL
credit: 'Collage of some of the images available from Lorem Picsum'
splash: media/lorem-picsum-collage.jpg
category: blog
published: true
tags: [eslint, yarn, pnp, typescript, javascript]
---

[Lorem Picsum][], the “Lorem Ipsum for photos”, is a very simple, very nice, free image placeholder service. As they put it, they provide “easy to use, stylish placeholders.” It’s indispensable whenever I’m putting together a quick demo or test or minimal reproduction or POC. Many [similar][] [services][] generate simple solid gray images with dimensions for wireframe-style usage, but I pretty much never have to create wireframes for my work, so I prefer something that resembles the final product.

The simplest way to use it is to request random images with a particular dimension (you can refresh this page to see different images being chosen at random for these examples). Want a random 1200×800 image? `https://picsum.photos/1200/800`:

![Random 1200×800 image from Lorem Picsum](https://picsum.photos/1200/800)

Or how about a square 450×450 grayscale image? `https://picsum.photos/450?grayscale`:

![Random 450×450 grayscale image from Lorem Picsum](https://picsum.photos/450?grayscale)

Or put some blur on it (ranging from 1–10) with `https://picsum.photos/900/600/?blur=9`:

![Random 900×600 blurred image from Lorem Picsum](https://picsum.photos/900/600/?blur=9)

They have a [gallery][] of all of their images, so you can also render a specific image by adding its id to the URL. This is actually the main way I use it, e.g. `https://picsum.photos/id/33/1350/900`:

![Photo of a meadow from Alejandro Escamilla](https://picsum.photos/id/33/1350/900)

Lastly, they have an [API][] for programmatic usage. It’s powered by [fastly][], and the images are curated from the asset treasure trove that is [Unsplash][]. Thank you to the creators, [David Marby][] & [Nijiko Yonskai][]!

[Lorem Picsum]: https://picsum.photos/
[similar]: https://placeholder.pics/
[services]: https://placehold.co/
[gallery]: https://picsum.photos/images
[API]: https://picsum.photos/#list-images
[fastly]: https://fastly.com/
[Unsplash]: https://unsplash.com/
[David Marby]: https://dmarby.se/
[Nijiko Yonskai]: https://github.com/Nijikokun
