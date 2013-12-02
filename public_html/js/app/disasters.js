var disasters = {
    flood: new Disaster({
        name: "Flood",
        description: "Water level increases. It flows over fields reducing food amount. Drinking water becomes polluted with mud. Money spent to resolve problems",
        probability: function(game){
            return game.resources.dioxide / 20;
        },
        effect: function(game){
            game.resources.money -= 200;
            game.resources.water -= 300;
            game.resources.food -= 300;
        }
    })
};


