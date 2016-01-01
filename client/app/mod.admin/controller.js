(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$q', 'dataservice', 'logger', 'auth'];
    /* @ngInject */
    function AdminController($q, dataservice, logger, auth) {
        var vm = this;
        vm.title = 'Admin';
        vm.users = [];

        activate();

        function activate() {
            var promises = [getUsers()];
            return $q.all(promises).then(function () {
                logger.info('Activated Admin View');
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
            return dataservice.getUsers(params).then(function (data) {
                vm.users = data;
                return vm.users;
            });
        }
    }
})();
