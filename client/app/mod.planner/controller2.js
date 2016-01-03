(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerNewController', PlannerNewController);

    PlannerNewController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function PlannerNewController(logger, analytics) {
        var vm = this;
        vm.title = 'Planner New';

        activate();

        function activate() {
            logger.info('Activated Planner New View');
            analytics.tp(vm.title);
        }
    }
})();
