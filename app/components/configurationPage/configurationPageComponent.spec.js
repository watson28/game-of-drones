'use strict';

var angular = require('angular');
var mocks = require('mocks/mockedServices');
var _ = require('lodash');
require('./configurationPageComponent');

describe('Component: configurationPage', function () {
    var configurationPageCtrl;
    var scope;
    var mockedMoves;

    beforeEach(angular.mock.module('gameOfDrones.components.configurationPage'));
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('$ngRedux', mocks.$ngRedux);
    }));

    beforeEach(angular.mock.inject(function ($rootScope, $componentController) {
        mockedMoves = [
            { move: 'paper', kills: 'rock' },
            { move: 'rock', kills: 'scissors' },
            { move: 'scissors', kills: 'paper' }
        ];
        scope = $rootScope.$new();

        configurationPageCtrl = $componentController('configurationPage', { $scope: scope });
        configurationPageCtrl.$onInit();

        // mock values that came from store
        configurationPageCtrl.roundsToWonGame = 3;
        configurationPageCtrl.movesJSONConfig = JSON.stringify(mockedMoves, undefined, 4);
    }));

    it('should enable error flag for invalid json', function () {
        configurationPageCtrl.movesJSONConfig = '[ { "move": "paper" ]';
        configurationPageCtrl.onSubmit();

        expect(configurationPageCtrl.visibleAlert).toBeTruthy();
        expect(configurationPageCtrl.alertType).toBe('danger');
    });

    it('should save valid json', function () {
        spyOn(configurationPageCtrl, 'saveGameConfig');

        configurationPageCtrl.movesJSONConfig = JSON.stringify(mockedMoves.slice(1), undefined, 4);
        configurationPageCtrl.onSubmit();

        expect(configurationPageCtrl.visibleAlert).toBeTruthy();
        expect(configurationPageCtrl.alertType).toBe('success');
        expect(configurationPageCtrl.saveGameConfig).toHaveBeenCalled();
    });
});
