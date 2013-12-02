$(document).ready(function() {
    var game = new Game({
        rules: rules,
        cards: cards,
        disasters: disasters
    });
    
    var view = new View(game);
    
    game.start();
    view.render();
});


