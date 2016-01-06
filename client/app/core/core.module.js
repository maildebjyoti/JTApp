(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'blocks.auth', 'blocks.analytics', 'blocks.fb', 'blocks.gm',
            'ui.router', 'ui.bootstrap'
        ]);
})();
