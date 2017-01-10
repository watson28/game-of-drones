'use strict';

var angular = require('angular');
var _ = require('lodash');
var mocks = require('mocks/mockedServices');
require('./landingPageComponent');

describe('Component: landingPage', function () {
    var landingPageCtrl;
    var scope;

    beforeEach(angular.mock.module('gameOfDrones.components.landingPage'));
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('$ngRedux', mocks.$ngRedux);
    }));

    beforeEach(angular.mock.inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        var binding = { '$router': mocks.$router };

        landingPageCtrl = $componentController('landingPage', { $scope: scope }, binding);
        landingPageCtrl.$onInit();
    }));

    it('should have an onSubmit method', function () {
        expect(_.isFunction(landingPageCtrl.onSubmit)).toBe(true);
    });

    describe('when submit', function () {
        it('should redirect to Game page', function () {
            scope.form = { $valid: true };
            spyOn(mocks.$router, 'navigate');

            landingPageCtrl.onSubmit();

            expect(mocks.$router.navigate).toHaveBeenCalled();
        });
    });
});
