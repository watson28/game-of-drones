'use strict';

require('angular');
require('angular-mocks');
require('phantomjs-polyfill-object-assign');

requireAll(require.context('./components', true, /\.spec\.js$/));
requireAll(require.context('./reducers', true, /\.spec\.js$/));

function requireAll (requireContext) {
    return requireContext.keys().forEach(requireContext);
}
