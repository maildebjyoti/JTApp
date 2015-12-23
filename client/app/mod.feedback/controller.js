(function () {
    'use strict';

    angular
        .module('app.feedback')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['logger'];
    /* @ngInject */
    function FeedbackController(logger) {
        var vm = this;
        vm.title = 'Feedback';

        activate();

        function activate() {
            logger.info('Activated Feedback View');
        }
    }
})();
