'use strict';

var angular = require('angular');
var template = require('./roundListComponent.html');

angular
.module('gameOfDrones.components.roundList', [])
.component('roundList', {
    template: template,
    bindings: { roundWinners: '<' }
});
