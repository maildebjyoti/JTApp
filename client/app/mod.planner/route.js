(function() {
    'use strict';

    angular
        .module('app.planner')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'planner',
                config: {
                    url: '/planner',
                    templateUrl: 'app/mod.planner/index.html',
                    controller: 'PlannerController',
                    controllerAs: 'vm',
                    title: 'Planner',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-home"></i> Planner'
                    }
                }
            }
        ];
    }
})();
