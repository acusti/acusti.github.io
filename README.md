Andrew Patton’s github user page source
=======================================

[![Build Status](https://travis-ci.org/acusti/acusti.github.io.svg?branch=master)](https://travis-ci.org/acusti/acusti.github.io)

__Requirements__:

- Jekyll: `gem install jekyll`
- Compass: `gem install compass`
- Node: `brew install node`

## First time use

*If you do not have Compass or Jekyll, install them first (see above)*

Run `yarn` or `npm install` from the root directory to locally install jspm.

## Workflow

To build the production JS and CSS bundles:

```bash
yarn build
```

To start the jekyll server with development configuration and drafts support:

```bash
yarn serve
```

To start the jekyll server with production configuration:

```bash
yarn serve:prod
```

License
-------

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
  <a rel="license"
     href="http://creativecommons.org/publicdomain/zero/1.0/">
    <img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
  </a>
  <br />
  To the extent possible under law,
  <a rel="dct:publisher"
     href="https://www.acusti.ca">
    <span property="dct:title">Andrew Patton</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">acusti.ca</span>.
This work is published from:
<span property="vcard:Country" datatype="dct:ISO3166"
      content="CA" about="https://www.acusti.ca">
  Canada</span>.
</p>
