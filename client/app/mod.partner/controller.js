(function () {
    'use strict';

    angular
        .module('app.partner')
        .controller('PartnerController', PartnerController);

    PartnerController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function PartnerController(logger, analytics) {
        var vm = this;
        vm.title = 'Partner';

        activate();

        function activate() {
            logger.info('Activated Partner View');
            analytics.tp(vm.title);
        }
    }
})();
