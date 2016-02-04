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
                address: '',
                placeid: '',
                location: '',
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
                    loc: 'Patna',
                    address: '',
                    placeid: '',
                    location: '',
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
                    loc: 'Delhi',
                    address: '',
                    placeid: '',
                    location: '',
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
                address: '',
                placeid: '',
                location: '',
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
            //TODO
            /*1. sanitize the dataservice
            2. google place decode with lat lng*/
            $state.go('planner', {
                myParam: vm.params
            });
        }
    }
})();
