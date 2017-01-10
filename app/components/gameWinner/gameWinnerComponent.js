'use strict';

var angular = require('angular');
var template = require('./gameWinnerComponent.html');

angular
.module('gameOfDrones.components.gameWinner', [])
.component('gameWinner', {
    template: template,
    bindings: {
        winnerName: '<',
        onPlayAgain: '&',
        onChoosePlayers: '&'
    }
});
