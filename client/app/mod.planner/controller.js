(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function PlannerController(logger, analytics) {
        var vm = this;
        vm.title = 'Planner';

        activate();

        function activate() {
            logger.info('Activated Planner View');
            analytics.tp('Planner');
        }
    }
})();
