//Login
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$q', 'logger', 'auth', '$state', 'analytics'];
    /* @ngInject */
    function LoginController($q, logger, auth, $state, analytics) {
        var vm = this;
        vm.title = 'Login';
        vm.login = login;

        activate();

        function activate() {
            logger.info('Activated Login View');
            analytics.tp(vm.title);
        }

        function login() {
            var loginObj = {
                email: vm.email,
                password: vm.password
            };

            auth.login(loginObj).then(function (data) {
                logger.log(data); //Success
                //console.log(auth.getToken());
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

    SignupController.$inject = ['$q', 'logger', 'auth', '$state', 'analytics'];
    /* @ngInject */
    function SignupController($q, logger, auth, $state, analytics) {
        var vm = this;
        vm.title = 'Signup';
        vm.name = '';
        vm.email = '';
        vm.password = '';
        vm.cpassword = '';
        vm.signup = signup;

        activate();

        function activate() {
            logger.info('Activated Signup View');
            analytics.tp(vm.title);
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
