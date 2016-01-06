(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger', 'analytics', 'gm'];
    /* @ngInject */
    function HomeController($q, dataservice, logger, analytics, gm) {
        var vm = this;
        vm.news = {
            title: 'JazzyTrip',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Home';

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            var promises = [];

            gm.initMap();

            return $q.all(promises).then(function() {
                logger.info('Activated Home View');
                analytics.tp(vm.title);
            });
        }
    }
})();
