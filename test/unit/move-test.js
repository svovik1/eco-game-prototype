define(["app/model"], function(Model){
    describe("Limit cards on hands per move", function(){
        var cardLimit;
        var cards;
        var move;
        
        beforeEach(function(){
            cardLimit = 2;
            cards = [new Model.Card({name:"card_0"}), new Model.Card({name:"card_1"}), new Model.Card({name:"card_2"})];
            move = new Model.Move({cardLimit: cardLimit});
        });
        
        it("should return limit", function(){
            expect(move.cardLimit()).toEqual(cardLimit);
        });
        
        it("should add cards below limit", function(){
            move.takeCard(cards[0]);
            expect(move.cardsOnHands().length).toBe(1);
            expect(move.cardsOnHands()).toContain(cards[0]);
        });
        
        it("should add cards equal to limit", function(){
            move.takeCard(cards[0]);
            move.takeCard(cards[1]);
            expect(move.cardsOnHands().length).toBe(2);
            expect(move.cardsOnHands()).toContain(cards[0]);
            expect(move.cardsOnHands()).toContain(cards[1]);
        });
        
        it("should not take cards beyond limit", function(){
            move.takeCard(cards[0]);
            move.takeCard(cards[1]);
            move.takeCard(cards[2]);
            expect(move.cardsOnHands().length).toBe(2);
            expect(move.cardsOnHands()).toContain(cards[0]);
            expect(move.cardsOnHands()).toContain(cards[1]);
            expect(move.cardsOnHands()).not.toContain(cards[2]);
        });
        
        it("should return true when taking card under limit", function(){
            move.takeCard(cards[0]);
            expect(move.takeCard(cards[1])).toEqual(true);            
        });
        
        it("should return false on attempt to take card beyond limit", function(){
            move.takeCard(cards[0]);
            move.takeCard(cards[1]);
            expect(move.takeCard(cards[2])).toEqual(false);            
        });
    });
    
});

