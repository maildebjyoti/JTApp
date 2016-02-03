(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['logger', 'analytics', '$state'];
    /* @ngInject */
    function PlannerController(logger, analytics, $state) {
        var vm = this;
        vm.title = 'Planner';

        activate();

        function activate() {
            logger.info('Activated Planner View');
            analytics.tp(vm.title);
            
            console.log('Planner - Data:');
            console.log($state.params.myParam);
        }
        
        //TODO
        /*
        1. get param
            a. from home
            b. from url 
            c. from id in url
            d. from db
        2. 
        */
    }
})();
