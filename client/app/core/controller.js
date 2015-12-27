//Login
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$q', 'logger', 'auth'];
    /* @ngInject */
    function LoginController($q, logger, auth) {
        var vm = this;
        vm.login = login;

        activate();

        function activate() {
            logger.info('Activated Login View');
        }

        function login() {
            var loginObj = {
                email: vm.email,
                password: vm.password
            };

            auth.login(loginObj).then(function (data) {
                logger.log(data); //Success
            });
        }
    }
})();
