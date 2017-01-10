'use strict';

var angular = require('angular');
var template = require('./configurationPageComponent.html');
var actions = require('actions');
var _ = require('lodash');

angular
.module('gameOfDrones.components.configurationPage', [])
.component('configurationPage', {
    template: template,
    controller: Controller
});

Controller.$inject = ['$ngRedux', '$timeout'];

function Controller ($ngRedux, $timeout) {
    var ctrl = this;
    ctrl.$onInit = $onInit;
    ctrl.$routerOnDeactivate = $routerOnDeactivate;
    ctrl.onSubmit = onSubmit;

    function $onInit () {
        ctrl.visibleAlert = false;
        ctrl.alertVisibilityPromise = null;
        ctrl.alertMessage = '';
        ctrl.alertType = '';
        ctrl.disconectFromStoreCB = connectToStore();
    }

    function connectToStore () {
        var mapDispatchToTarget = { saveGameConfig: actions.saveGameConfig };
        var mapStateToTarget = function (state) {
            return {
                roundsToWonGame: state.gameConfig.roundsToWonGame,
                movesJSONConfig: JSON.stringify(state.gameConfig.moves, undefined, 4)
            };
        };

        return $ngRedux.connect(mapStateToTarget, mapDispatchToTarget)(ctrl);
    }

    function $routerOnDeactivate () {
        ctrl.disconectFromStoreCB();
    }

    function onSubmit () {
        var moves = validateMoveConfigFormat(ctrl.movesJSONConfig);
        if (moves && validateRoundValue(ctrl.roundsToWonGame)) {
            ctrl.saveGameConfig(ctrl.roundsToWonGame, moves);
            showAlertMessage('Game Configuration has been saved!', 'success');
        }
    }

    function validateMoveConfigFormat (movesJSONConfig) {
        try {
            var moves = JSON.parse(movesJSONConfig);
            if (!_.isArray(moves)) {
                throw new MoveConfigFormatException('expected array of moves');
            }
            _.each(moves, validateSingleMove);
        } catch (exception) {
            return showAlertMessage(exception.message, 'danger');
        };

        return moves;
    }

    function validateSingleMove (move) {
        if (_.keys(move).length !== 2) {
            throw new MoveConfigFormatException('invalid move object properties (only allowed "move" & "kills")');
        }
        if (_.isNil(move.move)) {
            throw new MoveConfigFormatException('missing move object property: "move"');
        }
        if (_.isNil(move.kills)) {
            throw new MoveConfigFormatException('missing move object property: "kills"');
        }

        if (!_.isString(move.move)) {
            throw new MoveConfigFormatException('invalid value for "move" property: only allowed string');
        }
        if (!_.isString(move.kills)) {
            throw new MoveConfigFormatException('invalid value for "kills" property: only allowed string');
        }
    }

    function MoveConfigFormatException (message) {
        this.message = message;
        this.name = 'MoveConfigFormatException';
    }

    function validateRoundValue (roundsValue) {
        return _.isSafeInteger(roundsValue) && roundsValue > 0;
    }

    function showAlertMessage (message, type) {
        ctrl.alertMessage = message;
        ctrl.alertType = type;
        ctrl.visibleAlert = true;
        ctrl.alertVisibilityPromise && $timeout.cancel(ctrl.alertVisibilityPromise);
        ctrl.alertVisibilityPromise = $timeout(function () {
            ctrl.visibleAlert = false;
        }, 3000);
    }
}
