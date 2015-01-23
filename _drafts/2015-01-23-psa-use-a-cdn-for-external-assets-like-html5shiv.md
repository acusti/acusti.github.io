---
layout: post
category: blog
published: false
title: "PSA: Use a CDN for external assets like HTML5shiv "
---

To all builders of websites: when you want to include an external resource to make your site work better or provide backwards compatibility, do *not* use a publicly-accessible version control system to serve the resource. I see this problem most frequently on sites with the inclusion of the HTML5 shiv (or shim) script, used to enable HTML5 elements in IE 8 and older. The script was originally hosted on Google Code, and the project description recommended using a link to the version of the file in SVN at `//html5shiv.googlecode.com/svn/trunk/html5.js`. This is a terrible way to include any resource in a webpage! Check out the response headers for the file:

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