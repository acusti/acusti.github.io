module Jekyll
	module AtrributeFilter
		def sanitize_title(input)
			# from http://stackoverflow.com/a/1302183/333625
			# strip and downcase the string
			ret = input.strip.downcase
	
			# blow away apostrophes
			ret.gsub! /['`]/,""
	
			# @ --> at, and & --> and
			ret.gsub! /\s*@\s*/, " at "
			ret.gsub! /\s*&\s*/, " and "
	
			# replace all non alphanumeric, underscore or periods with hyphen
			 ret.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, '-'
	
			# convert multiple hyphens to single
			ret.gsub! /-+/,"-"
	
			# strip off leading/trailing hyphens
			ret.gsub! /\A[-\.]+|[-\.]+\z/,""
	
			ret
		end
	end
end

Liquid::Template.register_filter(Jekyll::AtrributeFilter)