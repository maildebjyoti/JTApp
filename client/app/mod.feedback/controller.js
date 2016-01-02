(function () {
    'use strict';

    angular
        .module('app.feedback')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function FeedbackController(logger, analytics) {
        var vm = this;
        vm.title = 'Feedback';

        activate();

        function activate() {
            logger.info('Activated Feedback View');
            analytics.tp(vm.title);
        }
    }
})();
