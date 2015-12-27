(function() {
    'use strict';

    angular
        .module('blocks.auth')
        .factory('auth', auth);

    auth.$inject = ['$q', 'dataservice', 'logger' ];

    /* @ngInject */
    function auth($q, dataservice, logger ) {
        var service = {
            login : login,
            islogin : islogin,
            forgotusername : forgotusername,
            forgotpassword : forgotpassword,
            signup : signup,
            getToken : getToken,
        };

        return service;
        /////////////////////

        function login(userObj) {
            return dataservice.doLogin(userObj).then(function (data) {
                return data;
            });
        }

        function islogin(message, data, title) {

        }

        function forgotusername(message, data, title) {

        }

        function forgotpassword(message, data, title) {

        }

        function signup(message, data, title) {

        }

        function getToken(message, data, title) {

        }
    }
}());
