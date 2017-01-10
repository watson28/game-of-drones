'use strict';

var angular = require('angular');
var reducer = require('reducers');
var initialState = require('reducers/initialState');
var componentsContext = require.context('components', true, /Component\.js$/);
componentsContext.keys().forEach(componentsContext);
// TODO make webpack handle the inner structure of angular_router
require('@angular/router/angular1/angular_1_router');
require('ng-redux');

angular
.module('gameOfDrone', [
    'ngRedux',
    'ngComponentRouter',
    'gameOfDrones.components.landingPage',
    'gameOfDrones.components.gamePage',
    'gameOfDrones.components.roundList',
    'gameOfDrones.components.playerMoveSelection',
    'gameOfDrones.components.gameWinner',
    'gameOfDrones.components.statisticsPage',
    'gameOfDrones.components.configurationPage'
])
.config(function ($locationProvider, $ngReduxProvider) { // TODO fix injection
    //$locationProvider.html5Mode(true);
    $ngReduxProvider.createStoreWith(reducer, [], [], initialState);
})
.value('$routerRootComponent', 'app')
.component('app', {
    template: '<ng-outlet></ng-outlet>',
    bindings: { $router: '<' },
    $routeConfig: [
        { path: '/', name: 'Landing', component: 'landingPage', useAsDefault: true },
        { path: '/game', name: 'Game', component: 'gamePage' },
        { path: '/statistics', name: 'Statistics', component: 'statisticsPage' },
        { path: '/configuration', name: 'Configuration', component: 'configurationPage' }
    ]
});
