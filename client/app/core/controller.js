//Login
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$q', 'logger', 'auth', '$state'];
    /* @ngInject */
    function LoginController($q, logger, auth, $state) {
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
                $state.go('planner');
            })
            .catch(function(err){
                console.log(err);
            });
        }
    }
})();

//Signup
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$q', 'logger', 'auth', '$state'];
    /* @ngInject */
    function SignupController($q, logger, auth, $state) {
        var vm = this;
        vm.name = '';
        vm.email = '';
        vm.password = '';
        vm.cpassword = '';
        vm.signup = signup;

        activate();

        function activate() {
            logger.info('Activated Signup View');
        }

        function signup() {
            var userObj = {
                name: vm.name,
                email: vm.email,
                password: vm.password
            };

            logger.log(userObj);
            auth.signup(userObj).then(function (data) {
                logger.log(data); //Success
                $state.go('planner');
            })
            .catch(function(err){
                console.log(err);
            });
        }
    }
})();
