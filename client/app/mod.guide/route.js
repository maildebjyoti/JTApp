(function() {
    'use strict';

    angular
        .module('app.feedback')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'guide',
                config: {
                    url: '/travelguide',
                    templateUrl: 'app/mod.guide/index.html',
                    controller: 'GuideController',
                    controllerAs: 'vm',
                    title: 'Travel Guide',
                    settings: {
                        nav: 3,
                        content: 'Travel Guide'
                    }
                }
            }
        ];
    }
})();
