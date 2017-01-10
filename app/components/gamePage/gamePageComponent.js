'use strict';

var angular = require('angular');
var template = require('./gamePageComponent.html');
var actions = require('actions');
var _ = require('lodash');

angular
.module('gameOfDrones.components.gamePage', [])
.component('gamePage', {
    controller: Controller,
    template: template,
    bindings: { $router: '<' }
});

Controller.$inject = ['$ngRedux'];

function Controller ($ngRedux) {
    var ctrl = this;
    ctrl.$onInit = $onInit;
    ctrl.$routerCanReuse = $routerCanReuse;
    ctrl.$routerOnDeactivate = $routerOnDeactivate;
    ctrl.addPlayerMove = addPlayerMove;
    ctrl.playAgain = playAgain;
    ctrl.choosePlayers = choosePlayers;

    function $onInit () {
        ctrl.playerTurn = 0;
        ctrl.roundMoves = [];
        ctrl.roundNumber = 1;
        ctrl.hasFinished = false;
        ctrl.disconectFromStoreCB = connectToStore();

        if (ctrl.players.length < 2) { choosePlayers() }

        ctrl.startNewGame();
    }

    function connectToStore () {
        var mapDispatchToTarget = {
            startNewGame: actions.startNewGame,
            addGameRound: actions.addGameRound,
            finishRunningGame: actions.finishRunningGame
        };

        var mapStateToTarget = function (state) {
            return {
                runningGame: state.runningGame,
                players: state.players,
                roundsToWonGame: state.gameConfig.roundsToWonGame,
                moves: state.gameConfig.moves.map(function (rule) {
                    return rule.move;
                })
            };
        };

        return $ngRedux.connect(mapStateToTarget, mapDispatchToTarget)(ctrl);
    }

    function $routerCanReuse () {
        return false;
    }

    function $routerOnDeactivate () {
        ctrl.disconectFromStoreCB();
    }

    function addPlayerMove (move) {
        if (!move) { return }

        ctrl.roundMoves.push({
            player: ctrl.players[ctrl.playerTurn],
            move: move
        });

        if (ctrl.playerTurn === ctrl.players.length - 1) {
            finishGameRound();
        } else {
            ctrl.playerTurn++;
        }
    }

    function finishGameRound () {
        ctrl.addGameRound(ctrl.roundMoves);
        if (hasAnyPlayerWonGame()) {
            ctrl.finishRunningGame();
            ctrl.hasFinished = true;
        } else {
            startNextRound();
        }
    }

    function startNextRound () {
        ctrl.roundMoves = [];
        ctrl.playerTurn = 0;
        ctrl.roundNumber++;
    }

    function hasAnyPlayerWonGame () {
        var winnersCount = _.countBy(ctrl.runningGame.roundWinners);
        return _.some(winnersCount, function (count) {
            return count >= ctrl.roundsToWonGame;
        });
    }

    function playAgain () {
        ctrl.$router.navigate(['Game']);
    }

    function choosePlayers () {
        ctrl.$router.navigate(['Landing']);
    }
}
