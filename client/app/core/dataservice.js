//TODO -- ?????
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            doLogin: doLogin,
            signup: signup
        };

        return service;

        function getMessageCount() {
            return $q.when(72);
        }

        function getUsers() {
            return $http.get('/api/users')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getUsers')(e);
            }
        }

        function doLogin(userObj) {
            return $http.post('/api/login', userObj)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success('Login-Success');
                return response.data;
            }

            function fail(e) {
                logger.error('Login-Error');
                return exception.catcher('XHR Failed for doLogin')(e);
            }
        }
        
        function signup(userObj) {
            return $http.post('/api/signup', userObj)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success('Signup-Success');
                return response.data;
            }

            function fail(e) {
                logger.error('Signup-Error');
                return exception.catcher('XHR Failed for Signup')(e);
            }
        }
    }
})();
