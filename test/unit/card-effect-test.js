define(["app/model"], function(model){
    describe("Effects applied to game resources", function(){        
        var resources;
        var increment, decrement;
        
        beforeEach(function(){
            resources = ["money", "energy", "water", "food"];
            increment = 10;
            decrement = -10;
        });
        
        it("increasing values should be good for money, energy, water and food", function(){                        
            for (i = 0; i < resources.length; i++) {
                var resource = resources[i];
                var effect = new model.Effect(resource, increment);
                expect(effect.type()).toEqual("good");
            }
        });
        
        it("decreasing values should be bad for money, energy, water and food", function(){                        
            for (i = 0; i < resources.length; i++) {
                var resource = resources[i];
                var effect = new model.Effect(resource, decrement);
                expect(effect.type()).toEqual("bad");
            }
        });
        
        it("increasing level of dioxide is bad", function(){
            var effect = new model.Effect("dioxide", increment);
            expect(effect.type()).toEqual("bad");
        });
        
        it("decreasing level of dioxide is good", function(){
            var effect = new model.Effect("dioxide", decrement);
            expect(effect.type()).toEqual("good");
        });
        
        it("type of effect without change should be neutral", function(){            
            var effect = new model.Effect("money", 0);            
            expect(effect.type()).toEqual("neutral");
        });
        
        it("change value should be available", function(){
            var effect = new model.Effect("money", increment);
            expect(effect.value()).toBe(increment);
        });
        
        it("resource name should be available", function(){
            var effect = new model.Effect("money", increment);
            expect(effect.resource()).toBe("money");
        });
    });
    
    describe("card effects", function(){
        var allResources;  
        var mockGame;
        var initialMoney = 100;
        
        beforeEach(function(){
           allResources = ["money", "energy", "water", "food", "dioxide"]; 
           
           mockGame = {
               resources: {
                   money: initialMoney
               }
           };
        });
        
        it("card have default effect on each resource", function(){
            var card = new model.Card();            
            for (var i = 0; i < allResources.length; i++) {                
                var resource = allResources[i];
                var effect = card.effectFor(resource);
                
                expect(effect.value()).toEqual(0);
                expect(effect.resource()).toEqual(resource);
            }
        });
        
        it("card return effect value", function(){
            var card = new model.Card({resources : {money: 20}});                        

            var effect = card.effectFor("money");
            
            expect(effect.resource()).toEqual("money");
            expect(effect.value()).toEqual(20);
        });
        
        it("card should change resources when played", function(){            
            var card = new model.Card({resources : {money: 20}});
            
            card.effect(mockGame);
            
            expect(mockGame.resources.money).toEqual(120);
        });
    });
    
    describe("weighted effects", function(){
        it("weighted value of zero effect is zero", function(){
            var effect = new model.Effect("money", 0);
            expect(effect.weightedValue()).toEqual(0);
        });
        
        it("weighted effect should be modifiable", function(){
            var effect = new model.Effect("money", 1);
            effect.weightedValue(50);
            expect(effect.weightedValue()).toEqual(50);
        });
        
        it("weighted effect of single effect should be 100%", function(){
            var effect = new model.Effect("money", 1);
            var calculator = new model.WeightedValueCalculator();
            calculator.calculate([effect]);
            expect(effect.weightedValue()).toEqual(100);            
        });
        
        it("weighted effect of resources should be calculated according to highest value", function(){
            var effect10 = new model.Effect("money", 10);
            var effect5 = new model.Effect("money", 5);
            var calculator = new model.WeightedValueCalculator();
            calculator.calculate([effect10, effect5]);
            expect(effect10.weightedValue()).toEqual(100);            
            expect(effect5.weightedValue()).toEqual(50);            
        });
        
        it("weighted effect shoud use absolute values", function(){
            var effect10 = new model.Effect("money", -10);
            var effect5 = new model.Effect("money", 5);
            var calculator = new model.WeightedValueCalculator();
            calculator.calculate([effect10, effect5]);
            expect(effect10.weightedValue()).toEqual(100);            
            expect(effect5.weightedValue()).toEqual(50);            
        });
        
        it("weighted effect of effects should be calculated per resource", function(){
            var money10 = new model.Effect("money", 10);
            var money5 = new model.Effect("money", 5);
            var food10 = new model.Effect("food", 4);
            var food2 = new model.Effect("food", 2);
            var calculator = new model.WeightedValueCalculator();
            calculator.calculate([money10, money5, food10, food2]);
            expect(money10.weightedValue()).toEqual(100);            
            expect(money5.weightedValue()).toEqual(50);            
            expect(food10.weightedValue()).toEqual(100);            
            expect(food2.weightedValue()).toEqual(50);            
        });
    });
});
