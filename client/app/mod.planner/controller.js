(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['logger', 'analytics'];
    /* @ngInject */
    function PlannerController(logger, analytics) {
        var vm = this;
        vm.title = 'Planner';

        activate();

        function activate() {
            logger.info('Activated Planner View');
            analytics.tp(vm.title);
        }

        vm.oneAtATime = false;
        vm.newActivities = [
            {
                title: 'Select Region',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Select Location',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Select Season',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Select Budget',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Select Duration',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Personalized Public Trips',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Promoted Trips',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Group Trips',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Open Trips',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Search Trip By ID',
                content: 'Dynamic Group Body'
            }
        ];
        vm.userActivities = [
            {
                title: 'Recent Trips/History',
                content: 'Dynamic Group Body'
            },
            {
                title: 'Saved Trips',
                content: 'Dynamic Group Body'
            }
        ];

    }
})();
