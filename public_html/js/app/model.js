function Game(){
  
    var self = this;
    
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
        
    };
    
    this.completeMove = function(){
        applyRules();
        notify("onFinishMove");
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
};

function Rule(rule){
    
    this.isApplicable = function(game){
        return rule.condition.call(rule, game);
    };
    
    this.execute = function(game){
        rule.effect.call(rule, game);
    };
};
