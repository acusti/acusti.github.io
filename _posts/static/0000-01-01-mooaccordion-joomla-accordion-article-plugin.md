---
published: true
layout: page
title: MooAccordion show/hide (in articles) Joomla plugin
permalink: mooaccordion-joomla-accordion-article-plugin
---

<p class="top">MooAccordion makes it easy to add MooTools accordion slides (show/hide blocks) to any article, which can be used to organize and display content more effectively (like in a FAQ page). The syntax is simple:</p>

```
{mooblock=Trigger Title (used to trigger the slide)}

Content of the slide block...

{/mooblock}
```

Each part of the mooblock should be on a separate line. Here’s how you can create a new accordion (and insure that it produces valid markup):

1. first type `{mooblock=First block title}`, then press enter/return,
2. then add your content (which can be anything), then enter/return,
3. then type `{/mooblock}`, then enter/return.
4. If you want any other blocks as a part of that accordion, you should then type in `{mooblock=Second block title}`, then enter/return, then the content, and continue in that manner.

##### Features include:

<ul class="standout features">
	<li>adds minimal markup (and intelligently strips unnecessary markup added by editors like tinyMCE and JCE, if present) to keep the html clean and valid</li>
	<li>uses Joomla core MooTools library, which means this plugin adds <i>no</i> HTTP requests, minimizes dependencies, prevents JS conflicts, and is very lightweight</li>
	<li>adds CSS class for active block title, allowing you to <a href="{{ site.base_url }}/mooaccordion-css-show-hide-demo-tutorial/">toggle it’s icon (e.g., from a + to a - icon)</a>; more generally, the markup is fully CSS customizable</li>
	<li>easy for anyone to use (without technical knowledge) and flexible</li>
	<li>the show/hide effects and other settings are easily customizable from the plugin‘s configuration</li>
	<li>compatible with Internet Explorer 6+, Firefox, Chrome, Safari, Opera, etc.</li>
</ul>

The plugin is similar to JoomlaWork’s [Tabs & Slides (in content items) Plugin][joomlaworks], the plugin I originally used before being inspired to write this one. My biggest problem with the JW plugin was that when I added the plugin syntax into an article, the plugin would create invalid markup from it, because the WYSIWIG editor automatically wrapped it in a `<p>`` tag. Also, it seemed foolish to use an old accordion script rather than the built-in accordion plugin that Joomla already comes with. This plugin solves those issues, and does so efficiently and robustly.

Note: the title can contain html if desired. If it is wrapped by one html element, that element will be used as the title toggler. Otherwise, it will wrap the title in a `<h4>` tag. Also, the title cannot contain `}`, or the plugin will incorrectly interpret that as the end of the title. Lastly, to create separate accordions, just make sure there is some kind of content (text, a `&nbsp;` character, an empty `<p>` tag, a `<br>`, etc.) separating the mooblocks.

This plugin is listed on the [Joomla Extensions Directory][jed].

### You can download it here (currently v1.0.4):

<p class="center"><a href="{{ site.base_url }}/extensions/plg_mooaccordion_v1_0_4_UNZIPFIRST.zip" class="download"><img src="{{ site.base_url }}/media/mooaccordion.png" alt="" title="MooAccordion Content Plugin" /></a></p>

<address class="vcard">
	<p class="top">If you have any problems using the plugin, wish to report a bug, or have any feature requests, please contact me, <span class="fn">Andrew Patton</span>, at:</p>
	<ul class="contact"><li><a class="email"></a></li></ul>
	<p class="legal bottom">This plugin is offered in the hope it will be useful but without any warranty whatsoever</p>
</address>


[tutorial]: {{ site.base_url }}/mooaccordion-css-show-hide-demo-tutorial/
[joomlaworks]: http://extensions.joomla.org/extensions/news-display/articles-tabs/1046
[jed]: http://extensions.joomla.org/extensions/style-a-design/tabs-a-slides/13424 "MooAccordion Joomla Content Plugin on the JED"
