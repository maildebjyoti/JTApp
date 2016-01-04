//http://blog.brunoscopelliti.com/facebook-authentication-in-your-angularjs-web-app/
//http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app/
//https://developers.facebook.com/docs/facebook-login/web


(function() {
    'use strict';

    //var FB; //??
    var enableFB = true;
    angular
        .module('blocks.fb')
        .run(init)
        .factory('fb', fb);

    fb.$inject = [];

    /* @ngInject */
    function fb() {
        var service = {
            /*checkLoginState : checkLoginState,
            statusChangeCallback: statusChangeCallback,
            testAPI: testAPI,
            getLoginStatus: getLoginStatus,*/
            login: login,
            logout: logout
        };
        return service;
        /////////////////////

        function login(obj) {
            if(enableFB){
                console.log('FB Login: ' + obj);
            }
        }

        function logout(obj) {
            if(enableFB){
                console.log('FB Logout: ' + obj);
            }
        }
    }

/************************************************************/
        function checkLoginState() {
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }

        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }

        function testAPI() {
            // Here we run a very simple test of the Graph API after login is
            // successful.  See statusChangeCallback() for when this call is made.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
            });
        }

        function getLoginStatus(){
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }
/************************************************************/

    function init(){
        if(enableFB){
            console.log('FB SDK initialized');
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1641743196089214',
                    xfbml: true,
                    cookie: true,
                    version: 'v2.5'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.
            if (typeof FB === 'undefined'){
                console.log('Not initialized yet...');

                setTimeout(function(){
                    getLoginStatus();
                }, 3000);
            }
            else {
                getLoginStatus();
            }
        }
    }
}());
