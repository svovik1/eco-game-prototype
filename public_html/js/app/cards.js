var cards = {
    card01: new Card({
        name: t("Import food"),
        description: "",
        effect: function(game){
            game.resources.money -= 300;
            game.resources.energy -= 150;
            game.resources.food += 300;
            game.resources.dioxide += 15;
        }
    }),
    card02: new Card({
        name: t("Impose a tax on fuel"),
        description: "",
        effect: function(game){
            game.resources.money += 100;
            game.resources.dioxide -= 15;
        }
    }),
    card03: new Card({
        name: t("Increase the number of forest"),
        description: "",
        effect: function(game){
            game.resources.money -= 5;
            game.resources.dioxide -= 10;
        }
    }),
    card04: new Card({
        name: t("Shift from coal to natural gas"),
        description: "",
        effect: function(game){
            game.resources.money -= 150;
            game.resources.energy += 300;
            game.resources.dioxide += 50;
        }
    }),
    card05: new Card({
        name: t("Enter fuel subsidies"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.dioxide += 20;
        }
    }),
    card06: new Card({
        name: t("Encourage the use of fossil fuels"),
        description: "",
        effect: function(game){
            game.resources.money += 50;
            game.resources.energy += 150;
            game.resources.dioxide += 10;
        }
    }),
    card07: new Card({
        name: t("To build a gas power plant"),
        description: "",
        effect: function(game){
            game.resources.money -= 150;
            game.resources.energy += 300;
            game.resources.dioxide += 25;
        }
    }),
    card08: new Card({
        name: t("Build a wind power"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.energy += 200;
            game.resources.dioxide -= 20;
        }
    }),
    card09: new Card({
        name: t("Export food"),
        description: "",
        effect: function(game){
            game.resources.money += 350;
            game.resources.energy -= 150;
            game.resources.food -= 300;
            game.resources.dioxide += 15;
        }
    }),
    card10: new Card({
        name: t("Promote recycling of waste"),
        description: "",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.energy += 50;
            game.resources.dioxide += 5;
        }
    }),
    card11: new Card({
        name: t("Provide external support"),
        description: "",
        effect: function(game){
            game.resources.money -= 200;
        }
    }),
    card12: new Card({
        name: t("Introduce a carbon tax"),
        description: "",
        effect: function(game){
            game.resources.money += 400;
            game.resources.dioxide -= 20;
        }
    }),
    card13: new Card({
        name: t("Export green technology"),
        description: "",
        effect: function(game){
            game.resources.money += 300;
            game.resources.dioxide -= 20;
        }
    }),
    card14: new Card({
        name: t("Explore the possibilities of nuclear power"),
        description: "",
        effect: function(game){
            game.resources.money -= 100;
        }
    }),
    card15: new Card({
        name: t("Ensure the use of biogas from garbage"),
        description: "",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.energy += 250;
            game.resources.dioxide -= 25;
        }
    }),
    card16: new Card({
        name: t("To support emissions trading"),
        description: "",
        effect: function(game){
            game.resources.money -= 100;
            game.resources.dioxide -= 20;
        }
    }),
    card17: new Card({
        name: t("To increase industrial energy efficiency"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.energy += 150;
            game.resources.dioxide -= 10;
        }
    }),
    card18: new Card({
        name: t("Invest in rail infrastructure"),
        description: "",
        effect: function(game){
            game.resources.money -= 5=;
            game.resources.energy += 150;
            game.resources.dioxide -= 10;
        }
    }),
    card19: new Card({
        name: t("To support the development of small farms"),
        description: "",
        effect: function(game){
            game.resources.money -= 100;
            game.resources.food += 150;
            game.resources.water -= 100;
            game.resources.dioxide -= 5;
        }
    }),
    card20: new Card({
        name: t("Promote the development and use of renewable energy"),
        description: "",
        effect: function(game){
            game.resources.money += 250;
            game.resources.energy += 100;
            game.resources.water -= 20;
            game.resources.dioxide -= 20;
        }
    }),
    card21: new Card({
        name: t("To support the development of organic farming"),
        description: "",
        effect: function(game){
            game.resources.money -= 150;
            game.resources.food += 100;
            game.resources.water -= 150;
            game.resources.dioxide -= 5;
        }
    }),
    card22: new Card({
        name: t("Conduct a campaign to reduce packaging"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.energy += 50;
            game.resources.dioxide -= 5;
        }
    }),
    card23: new Card({
        name: t("Improve the quality of highways"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.energy -= 100;
            game.resources.dioxide += 10;
        }
    }),
    card24: new Card({
        name: t("Establish rules for energy efficient construction"),
        description: "",
        effect: function(game){
            game.resources.money -= 50;
            game.resources.energy += 150;
            game.resources.dioxide -= 5;
        }
    }),
    card25: new Card({
        name: t("Investing in water infrastructure"),
        description: "",
        effect: function(game){
            game.resources.money -= 150;
            game.resources.water += 150;
        }
    }),
    card26: new Card({
        name: t("Increase the number of water treatment plants"),
        description: "",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.water += 500;
            game.resources.dioxide += 20;
        }
    }),
    card27: new Card({
        name: t("Require efficient use of gas in terms of household"),
        description: "",
        effect: function(game){
            game.resources.money -= 20;
            game.resources.energy += 50;
            game.resources.dioxide -= 5;
        }
    }),
    card28: new Card({
        name: t("Import green technology"),
        description: "",
        effect: function(game){
            game.resources.money -= 200;
            game.resources.dioxide -= 25;
        }
    }),
    card29: new Card({
        name: t("Export energy"),
        description: "",
        effect: function(game){
            game.resources.money += 200;
            game.resources.energy -= 1000;
            game.resources.dioxide -= 10;
        }
    }),
    card30: new Card({
        name: t("Investing in transportation infrastructure"),
        description: "",
        effect: function(game){
            game.resources.money -= 100;
            game.resources.energy += 50;
            game.resources.dioxide -= 5;            
        }
    })
};


