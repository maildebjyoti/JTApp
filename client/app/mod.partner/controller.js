(function () {
    'use strict';

    angular
        .module('app.partner')
        .controller('PartnerController', PartnerController);

    PartnerController.$inject = ['logger'];
    /* @ngInject */
    function PartnerController(logger) {
        var vm = this;
        vm.title = 'Partner';

        activate();

        function activate() {
            logger.info('Activated Partner View');
        }
    }
})();
