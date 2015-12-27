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
            getUsers: getUsers,
            getMessageCount: getMessageCount,
            doLogin: doLogin
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
    }
})();
