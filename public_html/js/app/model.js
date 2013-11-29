function Game(){
  
    this.resources = {
        money: 1000,
        energy: 0,
        water: 0,
        food: 0,
        dioxide: 0
    };
    
    var listeners = new Array();
    var rules = new Array();
  
    this.start = function(){
        
    };
    
    this.completeMove = function(){
        this.applyRules();
    };
    
    this.applyRules = function(){
        for(var i = 0; i < rules.length; i++){
            var rule = rules[i];
            
            if (rule.isApplicable(this)){
                rule.execute(this);
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

var Rule = function(isApplicableCallback, executeCallback){
    this.isApplicableCallback = isApplicableCallback;
    this.executeCallback = executeCallback;
    
    Rule.prototype.isApplicable = function(game){
        return this.isApplicableCallback.call(this, game);
    };
    
    Rule.prototype.execute = function(game){
        this.executeCallback.call(this, game);
    };
};
