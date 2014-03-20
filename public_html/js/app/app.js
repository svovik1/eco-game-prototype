define(["app/model", 
    "app/view", 
    "app/rules", 
    "app/disasters", 
    "app/cards", 
    "app/i18n-ui", 
    "app/history",
    "jquery"],
        function(model, view, rules, disasters, cards, translator, history, $) {

            function GameListener(view) {

                this.onGameStart = function(event) {
                    view.render(event);
                };

                this.onGameOver = function(event) {
                    if (history.enabled()){                        
                        history.save(event.snapshot);
                    }
                    view.gameOver(event, history);
                };

                this.onDisaster = function(event) {
                    view.showDisasterNotification(event);
                };

                this.onFinishMove = function(event) {
                    view.render(event);
                };

                this.onCardPick = function() {
                    view.pickCard();
                };

                this.onCardBeyondLimit = function(move) {
                    view.showCardBeyondLimitNotification(move);
                };
            }

            $(document).ready(function() {
                $('#starting').removeClass('preload');
                translator.translateUI();
                var player = new model.Player();
                var game = new model.Game({
                    rules: rules,
                    cards: cards,
                    disasters: disasters,
                    player: player
                });
                var welcome = new view.Welcome(player);

                var v = new view.View(game);
                
                game.addListener(new GameListener(v));
                
                $('.select-avatar .av-1').addClass('active');
                $('.user-info .avatar').attr('class', 'avatar').addClass('av-1');
                player.avatar("av-1");
                
                $('#starting input').change(function(){
                    var username = $('.username input').val();
                    if (username != '' && $('.select-avatar .avatar.active').length) {
                        player.name(username);
                        $('.btn.start-game').removeClass('disabled');
                    } else {
                        $('.btn.start-game').addClass('disabled');
                    }
                });
                
                $('.start-game').on('click', function(){
                    if ($('.username input').val() != '' && $('.select-avatar .avatar.active').length) {
                        $('.user-info .user-name span.name').html($('.username input').val());
                        
                        game.start();
                        $('.welcome-screen').hide();
                        $('.game-screen').show();   
                    }
                });
            });

        }
);