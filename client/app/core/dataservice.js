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
            signup: signup,
            getUsers: getUsers
        };

        return service;

        function getMessageCount() {
            return $q.when(72);
        }

        function getUsers(params) {
            return $http.get(params)
                .then(success)
                .catch(fail);

            function success(response) {
                return response;
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
                return response;
            }

            function fail(e) {
                return exception.catcher('User Login failed')(e);
            }
        }
        
        function signup(userObj) {
            return $http.post('/api/signup', userObj)
                .then(success)
                .catch(fail);

            function success(response) {
                return response;
            }

            function fail(e) {
                return exception.catcher('User Signup failed')(e);
            }
        }
    }
})();
