'use strict';

var angular = require('angular');
var template = require('./landingPageComponent.html');
var actions = require('actions');

angular
.module('gameOfDrones.components.landingPage', [])
.component('landingPage', {
    controller: Controller,
    template: template,
    bindings: { $router: '<' }
});

Controller.$inject = ['$scope', '$ngRedux'];

function Controller ($scope, $ngRedux) {
    var ctrl = this;
    ctrl.player1 = '';
    ctrl.player2 = '';
    ctrl.$onInit = $onInit;
    ctrl.onSubmit = onSubmit;

    function $onInit () {
        $ngRedux.connect(null, { setPlayers: actions.setPlayers })(ctrl);
    }

    function onSubmit () {
        if ($scope.form.$valid) {
            ctrl.setPlayers(ctrl.player1, ctrl.player2);
            ctrl.$router.navigate(['Game']);
        }
    }
}
