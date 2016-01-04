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
        vm.showModal = false;
        vm.value = 'abc';
        
        activate();

        function activate() {
            logger.info('Activated Planner New View');
            analytics.tp(vm.title);
        }
        
        vm.toggleModal = function() {
            console.log('toggle modal Before --' + vm.showModal);
            vm.showModal = !vm.showModal;
            console.log('toggle modal After --' + vm.showModal);
        };
        
        vm.success = function(){
            console.log('Value - '+ vm.value);
            vm.showModal = false;
        };
        
    }
})();

