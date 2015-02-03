---
layout: post
category: blog
published: true
title: The performance costs of custom underlines
splash: "media/dev-tools-timeline-for-custom-underline.png"
tags: 
  - typography
  - performance
baseline: "performance testing CSS text-shadow and linear-gradient"
---

Are CSS text shadows and linear gradients too expensive? I’ve been considering this question since I posted [last week][underline-post] about improving text underlines by clearing the descenders in text from the underline underneath. While I saw them described as [performance killing][post-comment] and [expensive][medium], I didn’t actually have any data.

So I started by creating two test cases in codepen with unreasonably link-heavy text, one using [default browser link underlining][test-control] and one with my [custom underline styles][test-custom]. I then opened up the Chrome Developer Tools [Timeline view][] and recorded timelines over five requests for both pages. The results seem damning: the average painting time for the control group was 1.67ms, while for the custom underlines, the average painting time was 124.59ms. In absolute terms, then, the average penalty for the four text-shadows + linear gradient was 122.92ms[^1].

I wanted to get a feeling for how that translated to actual load times, so I lined up some tests on [WebPagetest.org][] with a Motorola E and Nexus 7 (both using Chrome) based on the assumption that the penalty would be greatest for mobile devices.

Here is the average [SpeedIndex][] (time in ms until page is visually complete) for each device in each test:

|   | Moto E | Nexus 7 |
|---|--------|---------|
| Control | 2087 | 1902 |
| Custom  | 6147 | 4016 |

[^1]: I also tested IE11 with similar results, with an average time until visually complete of 514ms for the control and 527ms for the custom underlined version, though if you visually compare the median run from both tests, the results are [extremely similar][ie11-visual-comparison]

[underline-post]: http://www.acusti.ca/blog/2014/11/28/towards-a-more-perfect-link-underline/
[post-comment]: http://www.acusti.ca/blog/2014/11/28/towards-a-more-perfect-link-underline/#comment-1722135447
[medium]: https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9#26b3
[Timeline view]: https://developer.chrome.com/devtools/docs/timeline
[test-control]: http://s.codepen.io/acusti/debug/dPGOyd
[test-custom]: http://s.codepen.io/acusti/debug/myVOvN
[WebPagetest.org]: http://www.webpagetest.org/
[control-moto-e]: http://www.webpagetest.org/result/141208_VF_65A/
[SpeedIndex]: https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index

[ie11-visual-comparison]: http://www.webpagetest.org/video/compare.php?tests=141211_FQ_8QA,141211_S3_8Q6,141211_26_8Q1