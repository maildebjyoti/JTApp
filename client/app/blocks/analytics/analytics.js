(function() {
    'use strict';

    var enableGA = false;
    angular
        .module('blocks.analytics')
        .run(initAnalytics)
        .factory('analytics', analytics);

    analytics.$inject = ['logger'];

    /* @ngInject */
    function analytics(logger) {
        var service = {
            tp : trackPage,
            te : trackEvent
        };
        return service;
        /////////////////////

        function trackPage(page) {
            if(enableGA){
                //console.log('Track Page: ' + page);
                ga('send', 'pageview', page);
            }
        }

        function trackEvent(eCategory, eAction, eLabel) {
            if(enableGA){
                //console.log('Track Event: ');
                ga('send', {
                    hitType: 'event',
                    eventCategory: eCategory,
                    eventAction: eAction,
                    eventLabel: eLabel
                });
            }
        }
    }

    function initAnalytics(){
        if(enableGA){
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-71710384-1', 'auto');
        }
    }
}());
