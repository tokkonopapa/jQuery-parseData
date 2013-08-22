/*
* $.parseData v0.1.1
* Copyright 2013, tokkonopapa
* https://github.com/tokkonopapa/jQuery-parseData/
*
* This content is released under the MIT License
*/

;(function ($, undefined) {

	// Pre-compiled regular expression
	var _jsonize_brace = /^[{\[]/,         // check `{`、`[` at the beginning
	    _jsonize_token = /[^,:{}\[\]]+/g,  // retrieve token based on the delimiter
	    _jsonize_quote = /^['"](.*)['"]$/, // remove quotes at the top end
	    _jsonize_escap = /(["])/g;         // characters to be escaped

	// Convert JSON like literals to valid JSON
	// Numeric or String literal will be converted to strings.
	// The `undefined` will be converted to `{}`.
	function _jsonize(str) {
		// Wrap with `{}` if not JavaScript object literal
		str = $.trim(str);
		if (_jsonize_brace.test(str) === false) {
			str = '{' + str + '}';
		}

		// Retrieve token and convert to JSON
		return str.replace(_jsonize_token, function (a) {
			a = $.trim(a);

			// Keep some special strings as they are
			if ('' === a ||
				'true' === a || 'false' === a || 'null' === a ||
				(!isNaN(parseFloat(a)) && isFinite(a))) {
				return a;
			}

			// For string literal,
			// 1. remove quotes at the top end
			// 2. escape double quotes in the middle
			// 3. wrap token with double quotes
			else {
				return '"'
					+ a.replace(_jsonize_quote, '$1')
					   .replace(_jsonize_escap, '\\$1')
					+ '"';
			}
		});
	}

	$.fn.extend({
		parseData: function(key) {
			var objects = [];

			this.each(function () {
				// Get string in the data-* attribute
				var data = this.getAttribute('data-' + key),
				    obj = {};

				try {
					// Convert to JavaScript object
					obj = $.parseJSON(_jsonize(data));
				} catch (e) {
					// Create `{key: data}` in case of fail
					obj[key] = data;
				}

				objects.push(obj);
			});

			if (objects.length === 1) {
				return objects[0];
			} else {
				return objects;
			}
		}
	});

})(jQuery);
