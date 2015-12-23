(function () {
    'use strict';

    angular
        .module('app.faq')
        .controller('FaqController', FaqController);

    FaqController.$inject = ['logger'];
    /* @ngInject */
    function FaqController(logger) {
        var vm = this;
        vm.title = 'Help';

        activate();

        function activate() {
            logger.info('Activated Help/FAQ View');
        }
    }
})();
