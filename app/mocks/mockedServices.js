'use strict';

module.exports = {

    $ngRedux: function () {
        this.connect = function (mapStateToTarget, mapDispatchToTarget) {
            return function (target) {
                for (var key in mapDispatchToTarget) {
                    target[key] = function () {};
                }
                return function () {};
            };
        };
    },

    $router: {
        navigate: function () {}
    }
};
