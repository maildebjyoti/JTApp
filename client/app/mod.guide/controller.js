(function () {
    'use strict';

    angular
        .module('app.guide')
        .controller('GuideController', GuideController);

    GuideController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function GuideController(logger, analytics) {
        var vm = this;
        vm.title = 'Travel Guide';

        activate();

        function activate() {
            logger.info('Activated Travel Guide View');
            analytics.tp(vm.title);
        }
    }
})();
