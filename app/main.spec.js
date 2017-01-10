'use strict';

require('angular');
require('angular-mocks');

//requireAll(require.context('components', true, /\.spec\.js$/));
//requireAll(require.context('reducers', true, /\.spec\.js$/));
//var componentsContext = require.context('components', true, /\.spec\.js$/);
//componentsContext.keys().forEach(componentsContext);
//require('components/landingPageComponent.spec');

function requireAll (requireContext) {
    return requireContext.keys().map(requireContext);
}
