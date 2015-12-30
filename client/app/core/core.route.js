(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            },
            {
                state: 'about',
                config: {
                    url: '/about',
                    templateUrl: 'app/core/about.html',
                    title: 'About'
                }
            },
            {
                state: 'forgotusername',
                config: {
                    url: '/forgotusername',
                    templateUrl: 'app/core/forgotusername.html',
                    title: 'Forgot Username'
                }
            },
            {
                state: 'forgotpassword',
                config: {
                    url: '/forgotpassword',
                    templateUrl: 'app/core/forgotpassword.html',
                    title: 'Forgot Password'
                }
            },
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/core/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            },
            {
                state: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'app/core/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'vm',
                    title: 'Signup'
                }
            },
            {
                state: 'contact',
                config: {
                    url: '/contact',
                    templateUrl: 'app/core/contact.html',
                    title: 'Contact'
                }
            },
            {
                state: 'privacy',
                config: {
                    url: '/privacy',
                    templateUrl: 'app/core/privacy.html',
                    title: 'Privacy'
                }
            },
            {
                state: 'termsofuse',
                config: {
                    url: '/termsofuse',
                    templateUrl: 'app/core/termsofuse.html',
                    title: 'Terms of Use'
                }
            },
            {
                state: 'sitemap',
                config: {
                    url: '/sitemap',
                    templateUrl: 'app/core/sitemap.html',
                    title: 'Sitemap'
                }
            }
        ];
    }
})();
