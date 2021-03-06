---
published: true
layout: page
title: MooAccordion show/hide plugin demo and tutorial
permalink: mooaccordion-css-show-hide-demo-tutorial/
---

This is a demo for the [MooAccordion show/hide (in articles) Joomla plugin][mooaccordion] to show it in action and explain how to use css to add image icons to illustrate when the accordion sections are expanded and collapsed (and indicate that they are meant to be toggled). The toggling is achieved using CSS image sprites, so both states of the icon are contained in one file, and the image change is achieved just by modifying the CSS background-position.

In order to achieve this effect on your own site, you will need to put a copy of the icon image file somewhere on your server and then update your template’s CSS to include the CSS code specified at the end of this tutorial. You can edit your template’s css by going to Extensions → Template Manager, selecting your template, and then selecting the “Edit CSS” button. Note: make sure to modify the image icon url specified in the lines that say `background: url()` to point to wherever you uploaded the image on your server.

These are the image files used:

[<img class="demo" src="{{ site.base_url }}/images/icon-showhide1.png" alt="">][icon1] [<img class="demo" src="{{ site.base_url }}/images/icon-showhide2.png" alt="">][icon2]

[mooaccordion]: {{ site.base_url }}/mooaccordion-joomla-accordion-article-plugin/
[icon1]: {{ site.base_url }}/images/icon-showhide1.png
[icon2]: {{ site.base_url }}/images/icon-showhide2.png

Here is an example of what the final product looks like:

<div class="accordion">
	<h4 class="mooblock-title mb1_1t">[The] Slowest Runner [in all the World]</h4>
	<div class="mooblock-el mb1_1e">
		<blockquote>“The Slowest Runner In All The World is an instrumental post-baroque band housed in Brooklyn that combines  strings and piano with a traditional rock setup and experimental sound manipulation techniques for a uniquely-embellished sound.” — description from <a href="http://www.last.fm/music/(The)+Slowest+Runner+(In+All+The+World)">last.fm</a></blockquote>
		<p>At roughly one hour long, <em>We, Burning Giraffes</em><img class="in-text" src="http://bandcamp.com/files/41/79/4179622169-1.jpg" alt="We, Burning Giraffes Cover Art"> is a labyrinth.  It’s one of those albums where your perception of its quality is dependent on the amount of time you spend with it. At worst, it’s a boring instrumental record; at best, a world teeming with intricacies.  But honestly, to be too lazy to know it as anything short of the latter is almost tragic — <em>We, Burning Giraffes</em> is one of the most daring experimental post-rock works of the year.</p>
		<p>[The] Slowest Runner [in all the World], as they like to be punctuated, is a six-piece from Brooklyn, New York that bills themselves as a “post-baroque” act. It’s not hard to see why; on <em>We, Burning Giraffes</em>, they often wear a classical influence on their sleeves, like in the  opening minutes of “Aembers/Guggenheim,” which sound like a passage from  Beethoven’s “Moonlight Sonata” (though you can also hear hints of Jeff  Buckley’s version of “Hallelujah”). But they’re much more than just an old fashioned The Ascent of Everest, as they show in “Zoe Machete  Control’s” jazzy, barista-mood keys, which eventually evolve into loud  and fuzzy guitars, and in the “[Oscillation]” series, which take a page  from ambient drone label mates We All Inherit the Moon. And “We,  Burning Giraffes” shows they know how to throw a majestic, standout  climax on a commonplace post-rock build. So the band has no shortage of  talent, and in multiple facets of the instrumental trade, too.</p>
		<p class="citation">text from <a href="http://absolutepunk.net/showthread.php?t=1809452">absolutepunk.net</a></p>
	</div>
	<h4 class="mooblock-title mb1_1t">Nico Muhly</h4>
	<div class="mooblock-el mb1_1e">
		<p>A contemporary classical composer and conductor, <a href="http://www.allmusic.com/artist/nico-muhly-p677796">Nico Muhly</a> was born in Vermont in 1981. After graduating from Columbia University, <a href="http://www.allmusic.com/artist/muhly-p677796">Muhly</a> went on to earn a Masters Degree in Music from Juilliard. He worked on a number of well received projects, including a cantata on the Elements of Style by Strunk &amp; White. <a href="http://www.allmusic.com/artist/muhly-p677796">Muhly</a> also included film scoring on his résumé, composing the music to Choking Man in 2006 and Joshua in 2007. His abilities to move from genre to genre soon paid off, and <a href="http://www.allmusic.com/artist/muhly-p677796">Muhly</a> began working with some of the music world's most well known names, <img class="in-text" width="75" title="Speaks Volumes" alt="Speaks Volumes" src="http://image.allmusic.com/00/amg/cov75/dri300/i381/i38188iffzd.jpg">including <a href="http://www.allmusic.com/artist/bjrk-p27211">Björk</a>, <a href="http://www.allmusic.com/artist/antony-p385431">Antony</a> (of <a href="http://www.allmusic.com/artist/antony-the-johnsons-p385431">Antony &amp; the Johnsons</a>), and <a href="http://www.allmusic.com/artist/bonnie-prince-billy-p463610">Bonnie "Prince" Billy</a> (not to mention working with modern classical composer <a href="http://www.allmusic.com/artist/philip-glass-p3001">Philip Glass</a>). In 2006, his debut recording <a href="http://www.allmusic.com/album/speaks-volumes-r942850">Speaks Volumes</a> was released. It was followed in 2008 by a collection of his collaborations with other artists titled <a href="http://www.allmusic.com/album/ekvilibrium-r1086079">Ekvilibrium</a>. The next goal on <a href="http://www.allmusic.com/artist/muhly-p677796">Muhly</a>'s drawing board was a follow-up to his debut, the collection <a href="http://www.allmusic.com/album/mothertongue-r1396735">Mothertongue</a>.</p>
		<p class="citation">text from <cite>allmusic.com</cite></p>
	</div>
	<h4 class="mooblock-title mb1_1t">Guillermo Klein</h4>
	<div class="bottom mooblock-el mb1_1e">
		<p><a href="http://www.allmusic.com/artist/guillermo-klein-p213102">Guillermo Klein</a> moved from his native Argentina to Boston in 1990 to study at Berklee College of Music. In 1993 he moved to New York where he formed an inventive 17-piece big band. The band played Sunday nights at the underground club Smalls throughout 1995. Several years later, a newer, larger club called the Jazz Standard gave the Guillermo Klein Big Band a regular Monday night gig for several months. <a href="http://www.allmusic.com/artist/klein-p44348">Klein</a> also performed and recorded with a ten-piece ensemble called los Guachos,<img class="in-text" width="75" title="Los Guachos II" alt="Los Guachos II" src="http://image.allmusic.com/00/amg/cov75/drd600/d649/d64930o65ht.jpg"> which featured the likes of <a href="http://www.allmusic.com/artist/bill-mchenry-p349445">Bill McHenry</a>, <a href="http://www.allmusic.com/artist/chris-cheek-p301480">Chris Cheek</a>, <a href="http://www.allmusic.com/artist/ben-monder-p106799">Ben Monder</a>, and others. The band's debut on Candid Records was never released, but Sunnyside picked up Los Guachos Vol. 2 for release in 1999. Unfortunately for the New York jazz scene, <a href="http://www.allmusic.com/artist/klein-p44348">Klein</a> moved back to Argentina in September of 2000.</p>
		<p class="citation">text from <cite>allmusic.com</cite></p>
	</div>
</div>
<p class="bottom">and another one, this time with the triangle icons:</p>
<div class="accordion showhide2">
	<h4 class="mooblock-title mb1_2t">Lorem ipsum</h4>
	<div class="mooblock-el mb1_2e">
		<p>…dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		<p>Iaculis placerat nec stevirota congue habitant montes qui reprehenderit ullamcorper nascetur sociosqu placerat senectus per risus est laboris felis semper, ex sociosqu eiusmod. Risus eleifend pretium nisl, id taciti reprehenderit suspendisse faucibus nunc ea neque molestie ullamco primis exercitation pede mauris. Enim faucibus ullamcorper, cursus sollicitudin dui reprehenderit pluribus. Ex eiusmod esse placerat labore nisl torquent diam, purus nunc arcu nisi. Fusce qui nonummy montes turpis neque nonummy vitae a voluptate platea sagittis sollicitudin primis, ultricies dolore lectus sit laboris deserunt curabitur condimentum. Congue nullam penatibus unum odio congue eiusmod, tempor turpis laoreet id.</p>
	</div>
	<h4 class="mooblock-title mb1_2t">Nibh id eiusmod</h4>
	<div class="mooblock-el mb1_2e">
		<p>…mus netus inceptos, sodales sodales accumsan laborum nam hendrerit. Tincidunt deserunt orci eros lacus hymenaeos, placerat wisi nascetur mollit nibh accumsan. Cillum augue wisi nullam, maecenas at reprehenderit nostra tempor cillum irure a potenti natoque est proin pluribus vitae praesent.</p>
		<p>Potenti augue ante adipisicing, urna fusce placerat exercitation. Laborum dapibus gravida, magnis lobortis dictum lectus purus mollit congue fermentum montes sem aenean libero faucibus mauris. Leo magna tortor laboris ligula sagittis, arcu neque et fusce.</p>

<p>Aptent egestas nisi, culpa elit cras incididunt interdum. Nec nunc quis pariatur pluribus, senectus tincidunt eiusmod nonummy montes facilisis diam augue tempor ultrices proin auctor sociosqu. Sollicitudin dolor veniam fames, est non wisi.</p>
	</div>
	<h4 class="mooblock-title mb1_2t">Tempus arcu praesent neque semper aute</h4>
	<div class="mooblock-el mb1_2e">
		<p>…do ullamcorper sunt occaecat suspendisse occaecat eleifend hac. Ex nibh rutrum sit dignissim hac cillum laoreet malesuada lacinia dolor imperdiet ligula euismod, sollicitudin turpis aute laoreet facilisi lacinia deserunt laoreet sed id. In nam molestie incididunt, accumsan cupidatat cum. Mattis justo nunc pharetra convallis nibh volutpat lobortis nulla fermentum cursus semper dolore, venenatis nascetur aliqua aliquet. Accumsan congue voluptate sem at mauris, fugiat dictumst pede etiam penatibus sagittis ullamco porta eu do class. Fringilla lacus arcu odio scelerisque proin class luctus cursus nulla, et a deserunt vehicula sociosqu irure rutrum.</p>
	</div>
</div>
<h3>How it’s done (the css):</h3>
{% highlight css %}
.mooblock-title {
	color: #333b62;
	text-align: left;
	background: url("../images/icon-showhide1.png") no-repeat -24px -1px;
	padding-left: 22px;
	margin: 0.7em 0 0;
}
.mooblock-title.expanded {
	background-position: 0 -28px;
}
.mooblock-el {
	padding-left: 22px;
}
{% endhighlight %}

The CSS for adding the second icon is almost the same, though both background positions are slightly different. Instead of `-24px -1px`, use `-25px 1px`, and instead of `0 -28px`, use `1px -28px`. Also, update the image url to `icon-showhide2.png`. And lastly, you may want to remove `color: #333b62;` and just rely on your template’s default text color.

As you can see from the CSS code, the class that is added to the title elements when they are expanded is, appropriately, `expanded`. You can specify any styles you want only for that class, and they will apply only to active titles. Also, the general class for all titles is `mooblock-title`, and for all show/hide blocks is `mooblock-el`

<ul class="links-bottom">
	<li><a href="{{ site.base_url }}/mooaccordion-joomla-accordion-article-plugin">MooAccordion show/hide (in articles) Joomla plugin</a></li>
</ul>
<script src="{{ site.base_url }}/js/mootools-core+more.js"></script>
<script>
	var mooBlock = new Fx.Accordion($$('.mb1_1t'), $$('.mb1_1e'), {
		display: -1,
		alwaysHide: true,
		onActive: function(title, el){
			title.addClass('expanded');
			el.addClass('expanded');
		},
		onBackground: function(title, el){
			title.removeClass('expanded');
			el.removeClass('expanded');
		}
	});
	var mooBlock2 = new Accordion($$('.mb1_2t'), $$('.mb1_2e'), {
		display: -1,
		alwaysHide: true,
		onActive: function(title, el){
			title.addClass('expanded');
			el.addClass('expanded');
		},
		onBackground: function(title, el){
			title.removeClass('expanded');
			el.removeClass('expanded');
		}
	});
</script>
