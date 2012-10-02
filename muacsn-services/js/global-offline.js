/*
 * Title Caps
 * 
 * Modified from JavaScript port by John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function(){
	var small = '(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)';
	var punct = '([!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)';
  
	this.titleCaps = function(title){
		var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;
		title = lower(title); // start all lowercase
		
		while (true) {
			var m = split.exec(title);

			parts.push(title.substring(index, m ? m.index : title.length)
				.replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
					return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
				})
				.replace(RegExp('\\b' + small + '\\b', 'ig'), lower)
				.replace(RegExp('^' + punct + small + '\\b', 'ig'), function(all, punct, word){
					return punct + upper(word);
				})
				.replace(RegExp('\\b' + small + punct + '$', 'ig'), upper));
			
			index = split.lastIndex;
			
			if ( m ) parts.push( m[0] );
			else break;
		}
		
		return parts.join('').replace(/ V(s?)\. /ig, ' v$1. ')
			.replace(/(['Õ])S\b/ig, '$1s')
			.replace(/\b(AT&T|Q&A)\b/ig, function(all){
				return all.toUpperCase();
			});
	};
    
	function lower(word){
		return word.toLowerCase();
	}
    
	function upper(word){
	  return word.substr(0,1).toUpperCase() + word.substr(1);
	}
})();


/**
 * Custom helper object
 */
var _services = {
	log: function(message) {
		if (window.console)
			console.log(message);
	}
};

/*// Load the latest version of the Google Data JavaScript Client
google.load('gdata', '2.x');

var onDataLoad = function() {
	
	
}

// Call function once the client has loaded
google.setOnLoadCallback(onDataLoad);
*/
//localStorage.clear();
var url = 'https://docs.google.com/spreadsheet/pub?key=0AqdylY85YEtgdHE1NjhTbG1MbjBSMlZFV0UweTU2UVE&single=true&gid=0';
//var spreadsheet = new GoogleSpreadsheet();
// For offline testing and use, set spreadsheet data as array above, commented out next 2 lines, added a document.ready line
//spreadsheet.url(url);
//spreadsheet.load(function(result) {
$(function() {
	//var num_col = 17;
	//data = result.data;
	var num_cells = data.length;
	//if (num_cells % num_col !== 0) {
	//}
	var cell = [];
	
	// Nice to have number of columns, but it’s not really what we need. All we need to display is organization name, health issue (“section”), neighborhood, language (“Language of service”), reference needed (“reference needed?”)
	var column_titles = ['organization name', 'section', 'neighborhood', 'language of service', 'reference needed?'];
	var column_ids = [];
	var columns = {}; // let's try columns like this: columns[col_id] = title;
	/*var columns = [
		{col_id: '', title: ''},
		{col_id: '', title: ''},
		{col_id: '', title: ''},
		{col_id: '', title: ''},
		{col_id: '', title: ''}
	];*/

	// figure out number of rows
	for (var i = 0; i < num_cells; i++) {
		if (!data[i].length)
			continue;
		
		// don't start counting until we find the proper beginning
		if (!cell.length && data[i][1].toLowerCase() !== column_titles[0]) {
			data[i] = [];
			continue;
		}
		
		if (cell.length) {
			// if the previous cell has a larger ASCII value than the current one, we have finished the first row
			if (cell[0].charCodeAt() >= data[i][0].charCodeAt())
				break;
			//_services.log(data[i]);
		}
		cell = data[i];
		if (column_titles.indexOf(cell[1].toLowerCase()) > -1) {
			columns[cell[0].charAt()] = titleCaps(cell[1]);
			column_ids.push(cell[0].charAt());
		}
	}
	if (!cell.length)
		return false;
	
	var num_cols = cell[0].charCodeAt() - 'A'.charCodeAt() + 1;
	$('#results').html('number of columns: '+num_cols+'<br>number of cells:'+num_cells);

	var table = '<table>';
	var this_row_idx, this_col_idx, td_class;
	var first_row = true;
	var row_idx = 0;
	var col_idx = column_ids.length - 1;
	for (var i = 0; i < num_cells; i++) {
		if (!data[i].length)
			continue;
		
		td_class = data[i][0].charAt();
		if (typeof columns[td_class] == 'undefined')
			continue;
		
		if (first_row) {
			this_row_idx = data[i][0].charCodeAt();
			if (row_idx >= this_row_idx) {
				first_row = false;
			} else {
				table += '<th class="' + td_class + '-head">' + columns[td_class] + '</th>';
				row_idx = this_row_idx;
				continue;
			}
		}
		
		// if we skipped empty cells, this loop will fill them in
		// (this only works for when we are loading each column; I modified the logic to only work for determining first_row)
		/*for (row_idx++; this_row_idx > row_idx; row_idx++) {
			table += '<' + td + '></' + td + '>';
		}*/
		
		this_col_idx = column_ids.indexOf(td_class);
		if (this_col_idx != (col_idx+1)) {
			// figure out if we need to fill in
			if (this_col_idx > 0 || col_idx < (column_ids.length - 1)) {
				var max = this_col_idx > 0 ? this_col_idx : column_ids.length;
				for (col_idx++; col_idx < max; col_idx++) {
					table += '<td></td>';
				}
			}
		}
		
		// check if this td_class index === indexOf(cell[0].charAt)
		if (column_ids.indexOf(td_class) === 0) {
			if (!first_row)
				table += '</tr>';
			
			table += '<tr>';
		}
		// if first row, adjust the td_class (don't do it before)
		if (first_row) td_class += '-head';
		
		table += '<td class="' + td_class + '">' + data[i][1] + '</td>';
		col_idx = this_col_idx; // for lookback comparison
	}
	$('#results').append(table);
	
	// for searching:
	// each search control corresponds with a column id (A - Z), and each corresponding table element has that id as its class
	// in order to implement a AND search, as soon as a td is found to not have the search item, do $(this).parent().hide()
	// (first, $(table).slideUp(), then $(table).find('tr').show(), then do the search)

});

$('#services-search').on('submit', function() {
	
	return false;
})

//jsonUrl: "http://spreadsheets.google.com/feeds/cells/0AraHJx4zIJGFdElYNklGN1RMMzdKeW1xNTZaVzE1Y3c/od6/public/basic?alt=json-in-script"