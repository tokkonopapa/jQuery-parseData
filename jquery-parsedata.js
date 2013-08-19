
;(function ($, undefined) {

	// 正規表現は予めコンパイルしておく
	var _jsonize_brace = /^[{\[]/,         // 先頭が `{`、`[` で始まるか調べる
	    _jsonize_token = /[^,:{}\[\]]+/g,  // 区切り文字を元にトークンを切り出す
	    _jsonize_quote = /^['"](.*)['"]$/, // 先頭・末尾の `'`、`"` を削除する
	    _jsonize_escap = /"/g;             // `"` をエスケープする

	// JSON ライクな文字列を正規の JSON に変換する。
	// ただし、入力が数値／文字列リテラルの場合は正しく変換されない。
	// また入力が undefined の場合、空の JSON を表す `{}` を返す。
	function _jsonize(str) {
		// 非オブジェクトリテラルなら {...} で囲う
		str = $.trim(str);
		if (_jsonize_brace.test(str) === false) {
			str = '{' + str + '}';
		}

		// トークンを抽出し、JSON に変換する
		return str.replace(_jsonize_token, function (a) {
			a = $.trim(a);

			// 特別な値や数値はそのまま
			if ('' === a ||
				'true' === a || 'false' === a || 'null' === a ||
				(!isNaN(parseFloat(a)) && isFinite(a))) {
				return a;
			}

			// 文字列リテラルには以下の処理を施す
			// 1. 先頭・末尾のクォーテーションを削除
			// 2. 中間のダブルクォーテーションをエスケープ
			// 3. 全体をダブルクォーテーションで囲む
			else {
				return '"'
					+ a.replace(_jsonize_quote, '$1')
					   .replace(_jsonize_escap, '\\"')
					+ '"';
			}
		});
	}

	$.fn.extend({
		parseData: function(key) {
			var objects = [];

			this.each(function () {
				// データ属性を取得
				var data = this.getAttribute('data-' + key),
				    obj = {};

				try {
					// JavaScript オブジェクトに変換する
					obj = $.parseJSON(_jsonize(data));
				} catch (e) {
					// 変換に失敗した場合、`{key: data}` を作成する
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
