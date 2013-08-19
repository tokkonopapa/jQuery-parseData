jQuery-parseData
================

A simle parser to get the option object for jQuery plugin from HTML5 data-* 
attribute without `eval()`.

### Description:

This plugin consists of two functions - one is a utility function `_jsonize()` 
that convert a malformed JSON string into the almost valid JSON, and anoter is 
a `.parseData()` that translate a JSON into the JavaScript object.

The `.parseData()` uses `$.parseJSON()` which checks validity for JSON using 
the same logic of [Douglas Crockford's json2.js][JSON] like this:

```javascript
// Make sure the incoming data is actual JSON
// Logic borrowed from http://json.org/json2.js
if ( rvalidchars.test( data.replace( rvalidescape, "@" )
    .replace( rvalidtokens, "]" )
    .replace( rvalidbraces, "")) ) {

    return ( new Function( "return " + data ) )();
}
```

It means this plugin has a safety equivalent to the Douglas Crockford's json2.

### Usage:

Your markup like bellow:

```html
<div data-my-plugin='{"propertyFoo": "foo", "propertyBar": "bar"}'></div>
<div data-my-plugin="{propertyFoo: 'foo', propertyBar: 'bar'}"></div>
<div data-my-plugin="propertyFoo: foo, propertyBar: bar"></div>
```

will be transfered into the options object:

```javascript
{
    propertyFoo: "foo",
    propertyBar: "bar"
}
```

if you use `.parseData()` in your jQuery plugin like this:

```javascript
var opts = $(this).parseData('my-plugin');
```

### Example:

See [Demo on jsfiddle][DEMO].


[JSON]: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
[DEMO]: http://jsfiddle.net/gh/get/jquery/1.10.1/tokkonopapa/jQuery-parseData/tree/master/Demo/
