(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger', 'analytics'];
    /* @ngInject */
    function HomeController($q, dataservice, logger, analytics) {
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
            return $q.all(promises).then(function() {
                logger.info('Activated Home View');
                analytics.tp(vm.title);
            });
        }
    }
})();
