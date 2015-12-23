(function () {
    'use strict';

    angular
        .module('app.guide')
        .controller('GuideController', GuideController);

    GuideController.$inject = ['logger'];
    /* @ngInject */
    function GuideController(logger) {
        var vm = this;
        vm.title = 'Travel Guide';

        activate();

        function activate() {
            logger.info('Activated Travel Guide View');
        }
    }
})();
