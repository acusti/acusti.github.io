Andrew Patton’s github user page source
=======================================

__Requirements__:

- Jekyll: `gem install jekyll`
- Compass: `gem install compass` (prefix with `sudo` if it doesn’t work)
- Node or io.js: `brew install node` or `brew install iojs`
- [jspm][]: `npm install jspm -g`

## First time use

*If you do not have Compass or jspm, install them first (see above)*

Run `jspm install` from the root directory to fetch all the required jspm_packages (currently just [SystemJS][] for ES6 modules)

## Development workflow

To start the jekyll server with development configuration and drafts support:

```bash
jekyll serve --watch --config _config.yml,_config-local.yml --drafts
```

To build and watch styles:

```bash
$ cd _styles
$ compass watch
```

## Production workflow

To build the production self-executing bundled JS:

```bash
jspm bundle-sfx scripts/main app-built.js
```

To test the JS bundle locally, open `_config-local.yml` and comment out `env: development`, then restart the jekyll server

[jspm]: https://github.com/jspm/jspm-cli/wiki/Getting-Started
[SystemJS]: https://github.com/systemjs/systemjs

Design originally based on [Stephan Florquin’s](https://github.com/stephan83) Jekyll theme.

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
     href="http://www.acusti.ca">
    <span property="dct:title">Andrew Patton</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">acusti.ca</span>.
This work is published from:
<span property="vcard:Country" datatype="dct:ISO3166"
      content="CA" about="http://www.acusti.ca">
  Canada</span>.
</p>
