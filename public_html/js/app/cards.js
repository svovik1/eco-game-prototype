var cards = {
    modernizeManufactures: new Card({
        name: "Modernize Manufacturing",
        description: "Reduces Dioxide emmission by quarter for 200 of money and 50 of water",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.water -= 50;
            game.resources.dioxide = Math.floor(game.resources.dioxide / 4);
        }
    }),
    atomicEnergy: new Card({
        name: "Use Atomic Energy",
        description: "Increases energy level by 100 and reduces Dioxide by 20. Costs 200 of money",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.energy += 100;
            game.resources.dioxide -= 20;
        }
    })
};


