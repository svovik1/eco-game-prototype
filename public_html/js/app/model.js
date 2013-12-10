define([], function() {

    function Effect(resource, value) {

        var lessIsBetterResources = ["dioxide"];
        
        var isGood = function() {
            if (lessIsBetterResources.indexOf(resource) != -1) {
                return value < 0;
            }
            return value >= 0;
        }
        
        this.type = function(){
            if (value == 0){
                return "neutral";
            }
            return (isGood()) ? "good" : "bad";
        }

        this.value = function() {
            return value;
        }

        this.resource = function() {
            return resource;
        }
    }

    function Card(card) {

        var card = card || {};
        var resources = card.resources || {};
        var effects = {};

        for (var resource in resources) {            
            effects[resource] = new Effect(resource, card.resources[resource]);
        }

        this.name = function() {
            return card.name;
        };

        this.description = function() {
            return card.description;
        };

        this.effect = function(game) {
            if (card.effect) {
                card.effect.call(card, game);
            } else {
                for(var resource in effects){
                    game.resources[resource] += effects[resource].value();
                }
            }
        };

        this.effectFor = function(resource) {
            if (!effects[resource]) {                
                effects[resource] = new Effect(resource, 0);                
            }            
            return effects[resource];
        }
    }


    function Deck() {
        var cards = new Array();

        this.availableCards = function() {
            return cards;
        };

        this.putCard = function(card) {
            cards.push(card);
        };

        this.removeCard = function(card) {
            cards.splice(cards.indexOf(card), 1);
        };
    }

    function Move(options) {
        var cards = new Array();
        var cardLimit = 5;
        
        var init = function(){
            if (options){
                cardLimit = options.cardLimit || cardLimit;
            }
        };
        
        init();

        this.takeCard = function(card) {
            if (cards.length < cardLimit) {
                cards.push(card);
                return true;
            } else {
                return false;
            }
        };

        this.cardsOnHands = function() {
            return cards;
        };

        this.returnCard = function(card) {
            cards.splice(cards.indexOf(card), 1);
        };
        
        this.cardLimit = function(){
            return cardLimit;
        };
    }

    function Disaster(disaster) {

        this.name = function() {
            return disaster.name;
        };

        this.description = function() {
            return disaster.description;
        };
        
        this.type = function() {
           return disaster.type; 
        };

        this.probability = function(game) {
            return disaster.probability.call(disaster, game);
        };

        this.effect = function(game) {
            return disaster.effect.call(disaster, game);
        };
    }

    function Game(options) {

        var self = this;
        var deck = new Deck();
        var move;
        var gameOver = false;
        var movesCompleted = [];

        var disasters = [];
        var rules = [];

        var listeners = [];


        var parseOptions = function(options) {
            if (options.disasters) {
                for (var key in options.disasters) {
                    disasters.push(options.disasters[key]);
                }
            }

            if (options.rules) {
                for (var key in options.rules) {
                    rules.push(options.rules[key]);
                }
            }

            if (options.cards) {
                for (var key in options.cards) {
                    deck.putCard((options.cards[key]));
                }
            }
        };


        if (options) {
            parseOptions(options);
        }

        this.resources = {
            money: 1000,
            energy: 20,
            water: 20,
            food: 30,
            dioxide: 5
        };

        this.start = function() {
            move = new Move();
        };

        this.completeMove = function() {
            applyCards();
            checkDisasters();
            checkRules();
            if (!gameOver) {
                startNewMove();
            }
            notify("onFinishMove");
        };

        var startNewMove = function() {
            movesCompleted.push(move);
            move = new Move();
        };

        var applyCards = function() {
            var cards = move.cardsOnHands();
            for (var i in cards) {
                var card = cards[i];
                card.effect(self);
            }
        };

        var checkDisasters = function() {
            var disaster = getMostProbableDisaster();
            if (disasterWillHappen(disaster)) {                
                disaster.effect(self);
                notify("onDisaster", {disaster: disaster});
            }
        };

        var getMostProbableDisaster = function() {
            var maxProbability = 0;
            var mostProbableDisaster;
            for (var i = 0; i < disasters.length; i++) {
                var disaster = disasters[i];
                var probability = disaster.probability(self);
                if (maxProbability < probability) {
                    maxProbability = probability;
                    mostProbableDisaster = disaster;
                }
            }
            return mostProbableDisaster;
        };

        var disasterWillHappen = function(disaster) {
            if (disaster === undefined) {
                return false;
            }
            var probabilityThreshold = Math.floor(Math.random() * 100) + 1;
            return disaster.probability(self) > probabilityThreshold;
        };

        var checkRules = function() {
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];

                if (rule.isApplicable(self)) {
                    rule.execute(self);
                }
            }
        };

        this.lose = function(reason) {
            gameOver = true;
            notify("onGameOver", {result: "lose", reason: reason});
        };

        this.win = function(reason) {
            gameOver = true;
            notify("onGameOver", {result: "win", reason: reason});
        };

        this.addListener = function(listener) {
            listeners.push(listener);
        };

        var notify = function(method, event) {
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                if (listener[method]) {
                    listener[method].call(listener, event);
                }
            }
        };

        this.deck = function() {
            return deck;
        };

        this.pickCard = function(card) {
            if (move.takeCard(card)) {
                deck.removeCard(card);
                notify("onCardPick");
            } else {
                notify("onCardBeyondLimit", move);
            }
        };

        this.returnCard = function(card) {
            move.returnCard(card);
            deck.putCard(card);
            notify("onCardPick");
        };

        this.currentMove = function() {
            return move;
        };

        this.moveNumber = function() {
            return movesCompleted.length + 1;
        };
    }

    function Rule(rule) {

        this.isApplicable = function(game) {
            return rule.condition.call(rule, game);
        };

        this.execute = function(game) {
            rule.effect.call(rule, game);
        };
    }

    return {
        Card: Card,
        Deck: Deck,
        Game: Game,
        Move: Move,
        Disaster: Disaster,
        Rule: Rule,
        Effect: Effect
    };
});

