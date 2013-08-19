// simple tooltip plugin
;(function ($, window, document, undefined) {

    $.fn.MyPlugin = function (options) {

        options = $.extend({}, $.fn.MyPlugin.defaults, options);

        return this.each(function () {
            var opts, settings = {}, $this = $(this);

            opts = $this.parseData("color");
            settings = $.extend({}, options, settings, opts);

            opts = $this.parseData("background");
            settings = $.extend({}, options, settings, opts);

            opts = $this.parseData("text");
            settings = $.extend({}, options, settings, opts);

            opts = $this.parseData("tooltip");
            settings = $.extend({}, options, settings, opts);

            myPrivateFunc($this, settings);
        });
    };

    function myPrivateFunc($elm, settings) {
        $elm.on({
            mouseenter: function () {
                var offset = $elm.offset(),
                    x = Math.floor(offset.left),
                    y = Math.floor(offset.top),
                    tip = $('<span class="tip">' +
                            settings.text +
                            '<span class="tip-after"' +
                            'style="border-bottom-color:' +
                            settings.background +
                            '"</span></span>');

                $elm.append(tip.css({
                    'color': settings.color,
                    'background-color': settings.background,
                    'top': y + 16,
                    'left': x
                }));
            },
            mouseleave: function () {
                $elm.find(".tip").remove();
            }
        });
    }

    $.fn.MyPlugin.defaults = {
        color: "black",
        background: "white",
        text: "?"
    };

})(jQuery, window, document);

$(function () {
    var obj = $(".tooltip").MyPlugin({
        background: "yellow"
    });
});
