(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htFooter', htFooter);

    /* @ngInject */
    function htFooter () {
        var directive = {
            bindToController: true,
            controller: FooterController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-footer.html'
        };

        /* @ngInject */
        function FooterController() {
            var vm = this;
        }

        return directive;
    }
})();
