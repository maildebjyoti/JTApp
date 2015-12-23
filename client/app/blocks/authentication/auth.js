(function() {
    'use strict';

    angular
        .module('blocks.auth')
        .factory('auth', auth);

    auth.$inject = [];

    /* @ngInject */
    function auth() {
        var service = {
            login   : login,
            islogin : islogin,
            forgotusername : forgotusername,
            forgotpassword : forgotpassword,
            signup : signup,
        };

        return service;
        /////////////////////

        function login(message, data, title) {

        }

        function islogin(message, data, title) {

        }

        function forgotusername(message, data, title) {

        }

        function forgotpassword(message, data, title) {

        }

        function signup(message, data, title) {

        }
    }
}());
