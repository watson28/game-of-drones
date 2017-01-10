'use strict';

var angular = require('angular');
var _ = require('lodash');
var template = require('./statisticsPageComponent.html');

angular
.module('gameOfDrones.components.statisticsPage', [])
.component('statisticsPage', {
    template: template,
    controller: Controller
});

Controller.$inject = ['$ngRedux'];

function Controller ($ngRedux) {
    var ctrl = this;
    ctrl.$onInit = $onInit;
    ctrl.$routerOnDeactivate = $routerOnDeactivate;

    function $onInit () {
        ctrl.disconectFromStoreCB = connectToStore();
    }

    function connectToStore () {
        var mapStateToTarget = function (state) {
            return {
                playerStatistics: getGlobalPlayersStatistics(state.playedGames)
            };
        };

        return $ngRedux.connect(mapStateToTarget, {})(ctrl);
    }

    function getGlobalPlayersStatistics (playedGames) {
        var playerStatisticMap = {};
        var gameSummaries = _.map(playedGames, function (playedGame) {
            var winner = _.maxBy(playedGame.playerStatistics, 'wonRounds').player;
            var losers = _.map(_.reject(playedGame.playerStatistics, { player: winner }), 'player');

            return { winner: winner, losers: losers };
        });

        _.each(gameSummaries, function (gameSummary) {
            addPlayerRegisterIfNotExist(playerStatisticMap, gameSummary.winner);
            playerStatisticMap[gameSummary.winner].wonGames++;

            _.each(gameSummary.losers, function (loser) {
                addPlayerRegisterIfNotExist(playerStatisticMap, loser);
                playerStatisticMap[loser].lostGames++;
            });
        });

        return _.map(playerStatisticMap, function (value, key) {
            return Object.assign({}, value, {
                player: key,
                wonPercentage: calculateWonGamePercentage(value),
                lostPercentage: calculateLostGamePercentage(value)
            });
        });
    }

    function addPlayerRegisterIfNotExist (playerStatisticMap, player) {
        if (!playerStatisticMap[player]) {
            playerStatisticMap[player] = { wonGames: 0, lostGames: 0 };
        }
    }

    function $routerOnDeactivate () {
        ctrl.disconectFromStoreCB();
    }

    function calculateWonGamePercentage (playerStatistic) {
        return _.floor((playerStatistic.wonGames / (playerStatistic.wonGames + playerStatistic.lostGames)) * 100);
    }

    function calculateLostGamePercentage (playerStatistic) {
        return _.floor((playerStatistic.lostGames / (playerStatistic.wonGames + playerStatistic.lostGames)) * 100);
    }
}
