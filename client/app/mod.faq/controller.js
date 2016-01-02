(function () {
    'use strict';

    angular
        .module('app.faq')
        .controller('FaqController', FaqController);

    FaqController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function FaqController(logger, analytics) {
        var vm = this;
        vm.title = 'Help';

        activate();

        function activate() {
            logger.info('Activated Help/FAQ View');
            analytics.tp(vm.title);
        }
    }
})();
