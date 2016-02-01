(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'gm'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, gm) {
        var vm = this;
        //vm.busyMessage = 'Please wait ...';
        //vm.isBusy = true;
        $rootScope.showSpinner = true;
        vm.navline = {
            title: config.appTitle,
            text: 'JazzyTrip - A vaccation to remember',
            link: 'http://jazzytrip.com'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            gm.initMap();
            //hideSpinner();
        }

        function hideSpinner() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSpinner = false;
            }, 10000);
        }
    }
})();
