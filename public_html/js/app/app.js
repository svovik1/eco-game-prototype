$(document).ready(function() {

    var game = new Game({
        rules: rules,
        cards: cards,
        disasters: disasters
    });
    
    var view = new View(game);
    
    game.start();
    view.render();   
    
    $(".i18n").each(function(){
        var i18nEl = $(this);
        i18nEl.text(t(i18nEl.text()));
    });
    
});


