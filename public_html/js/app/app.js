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
        var el = $(this);
        el.text(t(el.text()));        
    });
    
    $(".i18n-title").each(function(){
        var el = $(this);
        el.attr("title", t(el.attr("title")));
    });
    
});


