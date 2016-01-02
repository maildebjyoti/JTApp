(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$q', '$state', 'dataservice', 'logger', 'auth', 'analytics'];
    /* @ngInject */
    function AdminController($q, $state, dataservice, logger, auth, analytics) {
        var vm = this;
        vm.title = 'Admin';
        vm.users = [];

        activate();

        function activate() {
            var promises = [getUsers()];
            return $q.all(promises).then(function () {
                logger.info('Activated Admin View');
                analytics.tp(vm.title);
            });
        }

        function getUsers() {
            var params = {
                method: 'GET',
                url: '/api/users',
                headers: {
                    'x-access-token': auth.getToken()
                }
            };
            return dataservice.getUsers(params)
                .then(function (data) {
                    vm.users = data;
                    return vm.users;
                })
                .catch(function(err){
                    console.log('Auth required');
                    $state.go('login');
                });
        }
    }
})();
