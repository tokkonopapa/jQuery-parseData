jQuery-parseData
================

A simle parser to get the option object for jQuery plugin from HTML5 data-* attribute without eval().

### Usage:

Your markup like those:

```html
<div data-my-plugin='{ "propertyFoo": "foo", "propertyBar": "bar" }'></div>
<div data-my-plugin="{ propertyFoo: 'foo', propertyBar: 'bar' }"></div>
<div data-my-plugin="propertyFoo: foo, propertyBar: bar"></div>
```

will get the options object:

```javascript
{
    propertyFoo: "foo",
    propertyBar: "bar
}
```

if you use `.parseData()` in your jQuery plugin like this:

```javascript
var opts = $(this).parseData('my-plugin');
```

### Example:

See [Demo on jsfiddle](http://jsfiddle.net/gh/get/jquery/1.10.1/tokkonopapa/jQuery-parseData/tree/master/Demo/).
