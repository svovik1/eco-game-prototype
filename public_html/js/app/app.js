$(document).ready(function() {
    var game = new Game();
                
    game.addRule(rules.lackOfResourcesLosesGame);
    game.addRule(rules.dioxideBelowThresholdRule);
    game.addRule(rules.debugRule);
    
    game.deck().putCard(cards.modernizeManufactures);
    game.deck().putCard(cards.atomicEnergy);
    
    var view = new View(game);
    
    game.start();
    view.render();
});


