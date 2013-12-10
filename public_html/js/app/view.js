define(["jquery"], function($) {
    function View(game) {
        var self = this;
        $(".game-move-complete").click(function() {
            self.hideNotifications();
            game.completeMove();
        });

        this.hideNotifications = function() {
            $(".notification").hide();
        };

        this.render = function() {
            this.renderMoveNumber();
            this.renderResources();
            this.renderCards();
        };

        this.renderMoveNumber = function() {
            $(".game-move-number").text(game.moveNumber());
        };

        this.renderResources = function() {
            $(".game-state-money").text(game.resources.money);
            $(".game-state-energy").text(game.resources.energy);
            $(".game-state-food").text(game.resources.food);
            $(".game-state-water").text(game.resources.water);
            $(".game-state-dioxide").text(game.resources.dioxide);
        };

        this.renderCards = function() {
            this.renderDeck();
            this.renderCardsOnHands();
        };

        this.renderDeck = function() {
            var cardTable = $(".game-available-cards");
            $(".card", cardTable).remove();
            var cards = game.deck().availableCards();
            for (var index in cards) {
                var card = cards[index];
                var cardNode = renderCard(card);
                cardNode.click(function() {
                    var card = $(this).data("card");
                    game.pickCard(card);
                });
                cardTable.prepend(cardNode);
            }
        };

        this.renderCardsOnHands = function() {
            var cardTable = $(".game-cards-on-hands");
            $(".card", cardTable).remove();
            var cards = game.currentMove().cardsOnHands();
            for (var index in cards) {
                var card = cards[index];
                var cardNode = renderCard(card);
                cardNode.click(function() {
                    var card = $(this).data("card");
                    game.returnCard(card);
                });
                cardTable.prepend(cardNode);
            }
        };

        var renderCard = function(card) {
            var template = $($("#card-template").html());
            $(".card-name", template).text(card.name());
            $(".card-description", template).text(card.description());

            for (var resource in game.resources) {
                var resourceProgress = $("." + resource + " .progress-bar", template);
                var progressClass = "progress-bar-info";
                switch (card.effectFor(resource).type()) {
                    case "good":
                        progressClass = "progress-bar-success";
                        break;
                    case "bad":
                        progressClass = "progress-bar-danger";
                        break;
                    case "neutral":
                        progressClass = "progress-bar-info";
                        break;
                }
                resourceProgress.addClass(progressClass);
            }
            template.data("card", card);
            return template;
        }

        this.onGameOver = function(event) {
            $(".game-screen").hide();
            $(".game-result-screen").removeClass("hidden");

            var resultText;
            var resultClass;
            if (event.result === "lose") {
                resultText = "You lost";
                resultClass = "alert-danger";
            } else {
                resultText = "You won!!!";
                resultClass = "alert-success";
            }
            $(".game-result").text(resultText).addClass(resultClass);

            if (event.reason) {
                $(".game-result-reason").text(event.reason).addClass(resultClass);
            }
        };

        this.onDisaster = function(event) {
            var disaster = event.disaster;
            $(".game-disaster-name").text(disaster.name());
            $(".game-disaster-description").text(disaster.description());
            $(".game-disaster").show();
        };

        this.onFinishMove = function(event) {
            this.render();
        };

        this.onCardPick = function() {
            this.renderCards();
        };

        game.addListener(this);

    }

    return {View: View};

});