'use strict';

var angular = require('angular');
var template = require('./playerMoveSelectionComponent.html');

angular
.module('gameOfDrones.components.playerMoveSelection', [])
.component('playerMoveSelection', {
    template: template,
    bindings: {
        roundNumber: '<',
        player: '<',
        moves: '<',
        onSelect: '&'
    },
    controller: Controller
});

function Controller () {
    var ctrl = this;
    ctrl.selectedMove = null;
    ctrl.selectMove = selectMove;

    function selectMove () {
        ctrl.onSelect({move: ctrl.selectedMove});
        ctrl.selectedMove = null;
    }
}
