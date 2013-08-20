# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "./"
css_dir = "../css"
images_dir = "../images"
javascripts_dir = "../js"
relative_assets = true

# Development or production?
environment = :development
# environment = :production

# Compress the CSS when in production
output_style = environment == :production ? :compressed : :nested

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

preferred_syntax = :sass

# Add retina compass helpers https://github.com/joelambert/Retina-Compass-Helpers
retina_ext = File.join(File.dirname(__FILE__), "retina")
require File.join(retina_ext, "lib", "sass_extensions.rb")
add_import_path File.join(retina_ext, "stylesheets")