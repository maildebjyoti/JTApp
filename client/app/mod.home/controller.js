(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger', 'analytics', '$state'];
    /* @ngInject */
    function HomeController($q, dataservice, logger, analytics, $state) {
        var vm = this;
        vm.plan = plan;
        vm.title = 'Home';

        vm.dateFormat = 'dd-MMMM-yyyy';
        vm.hstep = 1;
        vm.mstep = 1;
        vm.ismeridian = true;

        vm.originStartDt = false;
        vm.openDtPicker = openDtPicker;

        vm.params = {
            pref: {
                adults: 0,
                child: 0,
                currency: ''
            },
            startDetails: {
                loc: '',
                date: '',
                time: '',
                mode: {
                    flight: true,
                    bus: true,
                    train: true,
                    ship: true,
                    car: true,
                    subway: true
                }
            },
            destinations: [
                {
                    loc: '',
                    date: '',
                    time: '',
                    mode: {
                        flight: true,
                        bus: true,
                        train: true,
                        ship: true,
                        car: true,
                        subway: true
                    }
            },
                {
                    loc: '',
                    date: '',
                    time: '',
                    mode: {
                        flight: true,
                        bus: true,
                        train: true,
                        ship: true,
                        car: true,
                        subway: true
                    }
            }
            ],
            endDetails: {
                loc: '',
                date: '',
                time: '',
                mode: {
                    flight: true,
                    bus: true,
                    train: true,
                    ship: true,
                    car: true,
                    subway: true
                }
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
            console.log(vm.params);
            //TODO
            /*1. sanitize the dataservice
            2. google place decode with lat lng*/
            $state.go('planner', {
                myParam: vm.params
            });
        }

        function openDtPicker() {
            vm.originStartDt = true;
        }

    }
})();
