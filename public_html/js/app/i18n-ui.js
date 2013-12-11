define(["jquery", "app/i18n"], function($, i18n) {
    i18n.translateUI = function() {
        $(".i18n").each(function() {
            var el = $(this);
            el.text(i18n.get(el.text()));
        });

        $(".i18n-title").each(function() {
            var el = $(this);
            el.attr("title", i18n.get(el.attr("title")));
        });
    };
    
    return i18n;
});


