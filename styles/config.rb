# Require any additional compass plugins here.

## Retina compass helpers https://github.com/joelambert/Retina-Compass-Helpers
retina_path = File.join(File.expand_path(File.dirname(__FILE__)), "plugins", "retina")
require File.join(retina_path, "sass_extensions.rb")
add_import_path retina_path

## Base64 encode sass plugin http://stackoverflow.com/a/15455580/333625
require File.join(File.expand_path(File.dirname(__FILE__)), "plugins", "base64encode.rb")

# Set this to the root of your project when deployed:
http_path       = "/"
sass_dir        = ""
fonts_dir       = "./fonts"
css_dir         = "../css"
images_dir      = "../images"
javascripts_dir = "../js"
relative_assets = true

# Development or production?
# environment = :development
environment = :production

# Compress the CSS when in production
output_style = environment == :production ? :compressed : :nested

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

preferred_syntax = :sass

sourcemap = true
