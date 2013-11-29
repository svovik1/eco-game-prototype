function Card(card){
    this.name = function(){
        return card.name;
    };
    
    this.description = function(){
        return card.description;
    };
    
    this.effect = function(game){
        card.effect.call(card, game);
    };
};

function Deck(){
    var cards = new Array();
    
    this.availableCards = function(){
        return cards;
    };
    
    this.putCard = function(card){
        cards.push(card);
    };
    
    this.removeCard = function(card){
        cards.splice(cards.indexOf(card), 1);
    };
};

function Move(){
    var cards = new Array();
    
    this.takeCard = function(card){
        cards.push(card);
    };
    
    this.cardsOnHands = function(){
        return cards;
    };
    
    this.returnCard = function(card){
        cards.splice(cards.indexOf(card), 1);
    };
}   

function Game(){
  
    var self = this;
    var deck = new Deck();
    var move;
    
    this.resources = {
        money: 1000,
        energy: 1000,
        water: 1000,
        food: 1000,
        dioxide: 100
    };
    
    var listeners = new Array();
    var rules = new Array();
  
    this.start = function(){
        move = new Move();
    };
    
    this.completeMove = function(){  
        applyCards();
        applyRules();
        startNewMove();
        notify("onFinishMove");
    };   
    
    var startNewMove = function(){
        move = new Move();
    };
    
    var applyCards = function(){
        var cards = move.cardsOnHands();
        for(var i in cards){
            var card = cards[i];
            card.effect(self);
        }
    };
    
    var applyRules = function(){
        for(var i = 0; i < rules.length; i++){
            var rule = rules[i];
            
            if (rule.isApplicable(self)){
                rule.execute(self);
            }
        }
    };
    
    this.lose = function(reason){
        notify("onGameOver", {result: "lose", reason: reason});
    };
    
    this.win = function(reason){
        notify("onGameOver", {result: "win", reason: reason});
    };
    
    this.addListener = function(listener){
        listeners.push(listener);
    };
    
    this.addRule = function(rule){
        rules.push(rule);
    };
    
    var notify = function(method, event){
        for(var i = 0; i < listeners.length; i++){
            var listener = listeners[i];
            if (listener[method]){
                listener[method].call(listener, event);
            }
        }
    };
    
    this.deck = function(){
        return deck;
    };
    
    this.pickCard = function(card){
        deck.removeCard(card);
        move.takeCard(card);
        notify("onCardPick");
    };
    
    this.returnCard = function(card){
        move.returnCard(card);
        deck.putCard(card);
        notify("onCardPick");
    };
    
    this.currentMove = function(){
        return move;
    };
};

function Rule(rule){
    
    this.isApplicable = function(game){
        return rule.condition.call(rule, game);
    };
    
    this.execute = function(game){
        rule.effect.call(rule, game);
    };
};



