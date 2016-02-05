(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('widgetStart', widgetStart);

    widgetStart.$inject = [];
    /* @ngInject */
    function widgetStart () {
        var directive = {
            templateUrl: 'app/mod.home/widget-start.html',
            replace: true,
            restrict: 'E'
        };
        return directive;
    }
})();

(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('widgetEnd', widgetEnd);

    widgetEnd.$inject = [];
    /* @ngInject */
    function widgetEnd () {
        var directive = {
            templateUrl: 'app/mod.home/widget-end.html',
            replace: true,
            restrict: 'E'
        };
        return directive;
    }
})();

(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('widgetDestinations', widgetDestinations);

    widgetDestinations.$inject = [];
    /* @ngInject */
    function widgetDestinations () {
        var directive = {
            templateUrl: 'app/mod.home/widget-destinations.html',
            replace: true,
            restrict: 'E'
        };
        return directive;
    }
})();
