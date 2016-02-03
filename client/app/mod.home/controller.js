(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger', 'analytics', '$state'];
    /* @ngInject */
    function HomeController($q, dataservice, logger, analytics, $state) {
        var vm = this;
        vm.news = {
            title: 'JazzyTrip',
            description: '~!@#$%^&*'
        };
        vm.plan = plan;
        //vm.messageCount = 0;
        //vm.people = [];
        vm.title = 'Home';

        vm.params = {
            startDetails: {
                loc: 'Kolkata',
                locCode: '',
                placeid: '',
                lat: '',
                lng: '',
                date: '13-02-2016',
                time: '',
                mode: 'FLIGHT',
                pnr: '',
                ref: '',
                status: '',
                currency: 'INR',
                cost: ''
            },
            destinations: [
                {
                    loc: 'San Francisco',
                    locCode: '',
                    placeid: '',
                    lat: '',
                    lng: '',
                    startDate: '',
                    startTime: '',
                    endDate: '',
                    endTime: '',
                    mode: 'FLIGHT',
                    pnr: '',
                    ref: '',
                    status: '',
                    currency: 'INR',
                    cost: ''
                },
                {
                    loc: 'New York',
                    locCode: '',
                    placeid: '',
                    lat: '',
                    lng: '',
                    startDate: '29-02-2016',
                    startTime: '',
                    endDate: '',
                    endTime: '',
                    mode: 'FLIGHT',
                    pnr: '',
                    ref: '',
                    status: '',
                    currency: 'INR',
                    cost: ''
                }
            ],
            endDetails: {
                loc: 'Mumbai',
                locCode: '',
                placeid: '',
                lat: '',
                lng: '',
                date: '10-03-2016',
                time: '',
                mode: 'FLIGHT',
                pnr: '',
                ref: '',
                status: '',
                currency: 'INR',
                cost: ''
            }
        };

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            var promises = [];

            return $q.all(promises).then(function () {
                logger.info('Activated Home View');
                analytics.tp(vm.title);
            });
        }

        function plan() {
            $state.go('planner', {myParam:  vm.params});
        }
    }
})();
