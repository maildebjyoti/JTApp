(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'gm', '$window'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, gm, $window) {
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
            renderMapContainer();
            gm.initMap();
            //hideSpinner();
        }

        function hideSpinner() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSpinner = false;
            }, 10000);
        }

        function renderMapContainer(){
            //console.log('resize');
            var header = 50;
            $('#map').height($(window).height() - header);
        }

        angular.element($window).bind('resize', renderMapContainer);
    }
})();
