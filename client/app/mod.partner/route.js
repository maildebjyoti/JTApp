(function() {
    'use strict';

    angular
        .module('app.partner')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'partner',
                config: {
                    url: '/partner',
                    templateUrl: 'app/mod.partner/index.html',
                    controller: 'PartnerController',
                    controllerAs: 'vm',
                    title: 'Partner',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-home"></i> Partner'
                    }
                }
            }
        ];
    }
})();
