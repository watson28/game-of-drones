'use strict';

var angular = require('angular');
var mocks = require('mocks/mockedServices');
var _ = require('lodash');
require('./gamePageComponent');

describe('Component: gamePage', function () {
    var gamePageCtrl;
    var scope;

    beforeEach(angular.mock.module('gameOfDrones.components.gamePage'));
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('$ngRedux', mocks.$ngRedux);
    }));

    beforeEach(angular.mock.inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        var binding = { '$router': mocks.$router };

        gamePageCtrl = $componentController('gamePage', { $scope: scope }, binding);

        // mock values that came from store
        gamePageCtrl.runningGame = {
            roundWinners: [],
            winner: null
        };
        gamePageCtrl.players = ['player1', 'player2'];
        gamePageCtrl.moves = ['move1', 'move2', 'move3'];
        gamePageCtrl.roundsToWonGame = 3;

        gamePageCtrl.$onInit();
    }));

    it('should set default values', function () {
        expect(gamePageCtrl.roundNumber).toBe(1);
        expect(gamePageCtrl.playerTurn).toBe(0);
    });

    it('should change turn after player make its move', function () {
        gamePageCtrl.addPlayerMove('move1');
        expect(gamePageCtrl.playerTurn).toBe(1);
    });

    it('should finish round after all players make theirs moves', function () {
        spyOn(gamePageCtrl, 'addGameRound');

        _.each(gamePageCtrl.players, function () {
            gamePageCtrl.addPlayerMove('move1');
        });

        expect(gamePageCtrl.addGameRound).toHaveBeenCalled();
        expect(gamePageCtrl.roundNumber).toBe(2);
    });

    it('should finish game after player win enough rounds', function () {
        gamePageCtrl.runningGame.roundWinners = ['player1', 'player2', 'player1'];
        spyOn(gamePageCtrl, 'finishRunningGame');
        spyOn(gamePageCtrl, 'addGameRound').and.callFake(function () {
            gamePageCtrl.runningGame.roundWinners = ['player1', 'player2', 'player1', 'player1'];
        });

        gamePageCtrl.addPlayerMove('move1');
        gamePageCtrl.addPlayerMove('move2');

        expect(gamePageCtrl.finishRunningGame).toHaveBeenCalled();
    });
});
