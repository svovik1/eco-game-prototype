$(document).ready(function() {
    var game = new Game();
    
    var dioxideBelowThresholdRule = new Rule(
            function(game){
                return game.resources.dioxide <= this.threshold;
            },
            function(game){
                game.win("You dioxide level is below " + this.threshold);
            });
    dioxideBelowThresholdRule.threshold = 10;
    
    var lackOfResourcesLosesGame = new Rule(
            function(game){
                return game.resources.money <= 0 || 
                        game.resources.energy <= 0 ||
                        game.resources.water <= 0 ||
                        game.resources.food <= 0;
            },
            function(game){
                game.lose("You have lack of some vital resources");
            });
    game.addRule(lackOfResourcesLosesGame);
    game.addRule(dioxideBelowThresholdRule);
    
    var view = new View(game);
    
    game.start();
    view.render();
});


