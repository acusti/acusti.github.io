---
layout: post
category: blog
published: true
title: "PSA: Use a CDN for external assets like HTML5shiv"
splash: media/rocketship.svg
credit: "Rocketship created by [Jean-Philippe Cabaroc](http://thenounproject.com/cabaroc/) from the [Noun Project](http://thenounproject.com/term/rocket/7427/)"
tags:
  - performance
  - PSA
baseline: "The fast, easy, and free way to load external assets"
---

To my fellow builders of websites: when you want to include an external resource on a webpage, do *not* use a publicly-accessible version control system to serve the resource. I see this problem most frequently on sites with the inclusion of the [HTML5 shiv][] (shim) script, used to enable HTML5 elements in IE 8 and older. The script was originally hosted on Google Code, and the project description recommended using a link to the version of the file in SVN at [`html5shiv.googlecode.com​/svn​/trunk​/html5.js`][html5shiv-svn]. This is not a good way to include any resource in a webpage. Check out the response headers for the file:

```
HTTP/1.1 200 OK
Date: Fri, 23 Jan 2015 17:02:49 GMT
Server: Apache
Last-Modified: Thu, 26 Sep 2013 10:05:28 GMT
ETag: "32//trunk/html5.js"
Accept-Ranges: bytes
Expires: Fri, 23 Jan 2015 17:05:49 GMT
Content-Length: 2429
Content-Type: text/javascript
Age: 123
Cache-Control: public, max-age=180
Alternate-Protocol: 80:quic,p=0.02
```

The browser cache is set to expire in 3 minutes. Compare this to the headers of the same file from [jsDelivr][html5shiv-jsdelivr], the free, open source CDN:

```
HTTP/1.1 200 OK
Date: Sat, 24 Jan 2015 21:46:40 GMT
Content-Type: application/javascript; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Last-Modified: Thu, 07 Aug 2014 17:40:30 GMT
Vary: Accept-Encoding
Access-Control-Allow-Origin: *
Timing-Allow-Origin: *
Cache-Control: public, max-age=31536000
CF-Cache-Status: MISS
Server: cloudflare-nginx
CF-RAY: 1adf6cd2176c0f99-YYZ
Content-Encoding: gzip
```

JsDelivr serves the file as it should, gzipped with a far-future (60 year) max-age and no expires field. There are countless sites on the internet using the HTML5 shiv for their older IE users, and if people would generally use a proper CDN for including that file, those unfortunate users stuck browsing the internet with decrepit browsers would at least pretty much never have to wait for an HTTP request for the HTML5shiv again (unless anyone thinks IE8 will still be around in 2075).

There are three major free CDN servies I know of for including a wide range of third party resources on your site. They are:

- [jsDelivr][], powered by both [Cloudflare][] and [MaxCDN][], with load balancing/failover support provided by [Cedexis][]
- [CDNJS][], powered by Cloudflare
- [RawGit][], powered by MaxCDN

RawGit is different (and special) because it “serves raw files directly from GitHub with proper Content-Type headers”. This makes it particularly suited for use in your own software projects. As long as you host your work in a public GitHub repo, you can then serve those resources using a fast and professional CDN. There are two address schemes you can use: one is for development purposes, and basically serves the files from GitHub, adding proper headers; the other is for production, and only fetches the file from GitHub once, caching it indefinitely from then on. This means you should use a GitHub link with the appropiate commit hash in the URL, like [`https://github.com/​acusti/​acusti.github.com/​blob/​22fccc69da2363f917a60ab46​ac6cb9018c9981d/​_styles/​Pesto.scss`][pesto-url]. Also, be aware that while the RawGit CDN is powered by MaxCDN, the site and the development version of its service is provided without charge or renumeration by a generous individual named [Ryan Grove][], so be aware that it won’t last forever and in the meantime, don’t abuse it! See the [RawGit FAQ][] to better understand how to use it.

Lastly, there is also a site called [Open Source Software CDN][OSSCDN], powered by MaxCDN, but it says in its footer that it’s powered by jsDelivr.

Did I miss any resources? Any other suggestions? Let me know in the comments or on [Twitter][].

[html5shiv-svn]: //html5shiv.googlecode.com/svn/trunk/html5.js
[HTML5 shiv]: https://github.com/aFarkas/html5shiv
[html5shiv-jsdelivr]: http://www.jsdelivr.com/#!html5shiv
[jsDelivr]: http://www.jsdelivr.com
[MaxCDN]: https://www.maxcdn.com
[Cloudflare]: http://cloudflare.com
[Cedexis]: http://www.cedexis.com
[CDNJS]: https://cdnjs.com
[OSSCDN]: http://osscdn.com
[Ryan Grove]: http://wonko.com
[RawGit]: https://rawgit.com
[pesto-url]: https://github.com/acusti/acusti.github.com/blob/22fccc69da2363f917a60ab46ac6cb9018c9981d/_styles/Pesto.scss
[RawGit FAQ]: https://rawgit.com/faq
[Twitter]: https://twitter.com/andpatton
