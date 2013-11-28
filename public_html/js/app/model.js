var Game = function(){
  
    this.resources = {
        money: 0,
        energy: 0,
        water: 0,
        food: 0,
        dioxide: 0
    };
    
    this.listeners = new Array();
    this.rules = new Array();
  
    Game.prototype.start = function(){
        this.applyRules();
    };
    
    Game.prototype.applyRules = function(){
        for(var i = 0; i < this.rules.length; i++){
            var rule = this.rules[i];
            
            if (rule.isApplicable(this)){
                rule.execute(this);
            }
        }
    };
    
    Game.prototype.loseGame = function(){
        this.notify("onGameOver", {result: "lose"});
    };
    
    Game.prototype.addListener = function(listener){
        this.listeners.push(listener);
    };
    
    Game.prototype.addRule = function(rule){
        this.rules.push(rule);
    };
    
    Game.prototype.notify = function(method, event){
        for(var i = 0; i < this.listeners.length; i++){
            var l = this.listeners[i];
            if (l[method]){
                l[method].call(l, event);
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
