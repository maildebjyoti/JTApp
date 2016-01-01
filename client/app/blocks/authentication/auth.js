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
        var _token = '';
        return service;
        /////////////////////

        function login(userObj) {
            return dataservice.doLogin(userObj).then(function (data) {
                setToken(data.headers()['x-access-token']);
                return data;
            });
        }

        function islogin() {

        }

        function forgotusername() {

        }

        function forgotpassword() {

        }

        function signup(userObj) {
            return dataservice.signup(userObj).then(function (data) {
                setToken(data.headers()['x-access-token']);
                return data;
            });
        }

        function renewToken(){

        }

        function setToken(key){
            _token = key;
            sessionStorage.setItem('TOKEN', _token);
        }

        function getToken() {
            return sessionStorage.getItem('TOKEN');
            //return _token;
        }
    }
}());
