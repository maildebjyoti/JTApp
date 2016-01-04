(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.auth', 'blocks.analytics', 'blocks.fb',
            'ui.router', 'ui.bootstrap'
        ]);
})();
