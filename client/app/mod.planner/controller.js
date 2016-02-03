(function () {
    'use strict';

    angular
        .module('app.planner')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['logger', 'analytics', '$state', 'gm'];
    /* @ngInject */
    function PlannerController(logger, analytics, $state, gm) {
        var vm = this;
        vm.title = 'Planner';

        activate();

        function activate() {
            logger.info('Activated Planner View');
            analytics.tp(vm.title);
            plan();
        }
        
        //TODO
        /*
        1. get param
            a. from home
            b. from url 
            c. from id in url - store in localstorage
            d. from db
        2. 
        */
        function plan(){
            var loc = [];

            if($state.params.myParam){
                var param = $state.params.myParam;
                //Start Point
                loc.push(param.startDetails);
                //Destinations
                for(var i=0; i<param.destinations.length; i++){
                    loc.push(param.destinations[i]);
                }
                //End Point
                loc.push(param.endDetails);

                //Decode & Plot
                for (i=0; i<loc.length; i++){
                    gm.geocode(loc[i].loc, setData, i);
                }

            }
            else {
                $state.go('home');
            }

            function setData(data, index){
                loc[index].address = data.address_components;
                loc[index].location = data.geometry.location;
                loc[index].placeid = data.place_id;
            }
        }
    }
})();
