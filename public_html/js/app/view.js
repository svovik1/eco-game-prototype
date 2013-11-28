var View = function(game){
  
    game.addListener(this);
  
    View.prototype.render = function(){
        $(".game-state-money").text(game.resources.money);
        $(".game-state-energy").text(game.resources.energy);
        $(".game-state-food").text(game.resources.food);
        $(".game-state-water").text(game.resources.water);
        $(".game-state-dioxide").text(game.resources.dioxide);
    };
    
    View.prototype.onGameOver = function(event){
        $(".bar").hide();
        $(".game-over").removeClass("hidden");
        
        var resultText;
        if (event.result === "lose"){
            resultText = "You lost";            
        } else {
            resultText = "You won!!!";
        }
        $(".game-result").text(resultText);
        
        if (event.reason){
            $(".game-result-reason").text(event.reason);
        }
    };
};



