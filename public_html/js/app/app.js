$(document).ready(function() {
    var game = new Game();
                
    game.addRule(rules.lackOfResourcesLosesGame);
    game.addRule(rules.dioxideBelowThresholdRule);
    game.addRule(rules.debugRule);
    
    var view = new View(game);
    
    game.start();
    view.render();
});


