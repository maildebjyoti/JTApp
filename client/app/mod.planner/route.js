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
                    params: {myParam: null},
                    controllerAs: 'vm',
                    title: 'Planner',
                    settings: {
                        nav: 2,
                        content: 'Planner'
                    }
                }
            },
            {
                state: 'pnew',
                config: {
                    url: '/planner/new',
                    templateUrl: 'app/mod.planner/planner-new.html',
                    controller: 'PlannerNewController',
                    controllerAs: 'vm',
                    title: 'Planner'
                }
            }
        ];
    }
})();
