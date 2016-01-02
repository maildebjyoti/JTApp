(function () {
    'use strict';

    angular
        .module('app.core', [
            //'ngAnimate', -Debjyoti commented
            'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.auth', 'blocks.analytics',
            'ui.router' //, 'ngplus'-Debjyoti Commented
        ]);
})();
