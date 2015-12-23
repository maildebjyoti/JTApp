(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['logger'];
    /* @ngInject */
    function PlannerController(logger) {
        var vm = this;
        vm.title = 'Planner';

        activate();

        function activate() {
            logger.info('Activated Planner View');
        }
    }
})();
