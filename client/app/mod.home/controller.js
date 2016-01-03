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


        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        var slides = vm.slides = [];
        vm.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' '
                + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            vm.addSlide();
        }



    }
})();
