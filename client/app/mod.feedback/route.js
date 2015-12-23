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
                state: 'feedback',
                config: {
                    url: '/feedback',
                    templateUrl: 'app/mod.feedback/index.html',
                    controller: 'FeedbackController',
                    controllerAs: 'vm',
                    title: 'Feedback',
                    settings: {
                        nav: 6,
                        content: 'Feedback'
                    }
                }
            }
        ];
    }
})();
