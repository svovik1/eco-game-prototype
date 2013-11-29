$(document).ready(function() {
    var game = new Game();
                
    game.addRule(rules.lackOfResourcesLosesGame);
    game.addRule(rules.dioxideBelowThresholdRule);    
    
    game.deck().putCard(cards.modernizeManufactures);
    game.deck().putCard(cards.atomicEnergy);
    game.deck().putCard(cards.takeMoneyAndGoAway);
    
    var view = new View(game);
    
    game.start();
    view.render();
});


