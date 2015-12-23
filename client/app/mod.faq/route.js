(function() {
    'use strict';

    angular
        .module('app.faq')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'help',
                config: {
                    url: '/help',
                    templateUrl: 'app/mod.faq/index.html',
                    controller: 'FaqController',
                    controllerAs: 'vm',
                    title: 'Help',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-home"></i> Help'
                    }
                }
            }
        ];
    }
})();
