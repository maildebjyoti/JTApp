//http://blog.brunoscopelliti.com/facebook-authentication-in-your-angularjs-web-app/
//http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app/
//https://developers.facebook.com/docs/facebook-login/web

/*https://developers.facebook.com/docs/javascript/howto/angularjs
.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});

$scope.getMyLastName = function() {
   facebookService.getMyLastName() 
     .then(function(response) {
       $scope.last_name = response.last_name;
     }
   );
};*/

(function() {
    'use strict';

    var enableFB = false;
    var _fb = {
        login: function(){
            FB.login(function(response) {
                console.log('LOGIN: ' + JSON.stringify(response));
                _fb.statusChangeCallback(response);
            }, {scope: 'public_profile,email'});
        },
        logout: function(){
            FB.logout(function(response) {
                //Logged out
                console.log('LOGOUT: ' + JSON.stringify(response));
            });
        },
        checkLoginState : function () {
            FB.getLoginStatus(function (response) {
                _fb.statusChangeCallback(response);
            });
        },
        getLoginStatus: function (){
            FB.getLoginStatus(function (response) {
                _fb.statusChangeCallback(response);
            });
        },
        statusChangeCallback: function (response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            /*
                status --specifies the login status of the person using the app. The status can be one of the following:
                connected.-- The person is logged into Facebook, and has logged into your app.
                not_authorized.-- The person is logged into Facebook, but has not logged into your app.
                unknown.-- The person is not logged into Facebook, so you don't know if they've logged into your app.
                authResponse-- is included if the status is connected and is made up of the following:
                accessToken.-- Contains an access token for the person using the app.
                expiresIn.-- Indicates the UNIX time when the token expires and needs to be renewed.
                signedRequest.-- A signed parameter that contains information about the person using the app.
                userID-- is the ID of the person using the app.
            */
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                _fb.getFBDetails();
                if (response.status === 'connected') {
                    console.log('Access Token: ' + response.authResponse.accessToken);
                }
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }, 
        getFBDetails: function () {
            // Here we run a very simple test of the Graph API after login is
            // successful.  See statusChangeCallback() for when this call is made.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('DETAILS: ' + JSON.stringify(response));
                //document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
            });
        }
    };
    
    angular
        .module('blocks.fb')
        .run(init)
        .factory('fb', fb);

    fb.$inject = [];

    /* @ngInject */
    function fb() {
        var service = {
            checkLoginState : _fb.checkLoginState,
            getLoginStatus: _fb.getLoginStatus,
            statusChangeCallback: _fb.statusChangeCallback,
            getFBDetails: _fb.getFBDetails,
            login: _fb.login,
            logout: _fb.logout
        };
        return service;
    }

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
                setTimeout(function(){
                    _fb.getLoginStatus();
                }, 3000);
            } 
            else {
                _fb.getLoginStatus();
            }
        }
    }
}());
