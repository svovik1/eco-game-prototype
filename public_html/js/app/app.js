$(document).ready(function() {
    var game = new Game();
    
    var noMoneyLoseGameRule = new Rule(
            function(game){
                return game.resources.money <= 0;
            },
            function(game){
                game.loseGame();
            });
    game.addRule(noMoneyLoseGameRule);
    var view = new View(game);
    game.start();
    view.render();
});


