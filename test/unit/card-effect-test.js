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
});
