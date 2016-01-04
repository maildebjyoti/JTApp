//http://jsfiddle.net/alexsuch/RLQhh/
(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('htWidgetModal', htWidgetModal);

    /* @ngInject */
    function htWidgetModal() {
        //Usage:
        /*
            <div ht-widget-modal title="Login form" visible="vm.showModal" >
                <form role="form">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>

            <button ng-click="vm.toggleModal()" class="btn btn-default">Open modal {{vm.showModal}}</button>
        */
        var directive = {
            scope: true,
            template:   '<div class="modal fade">' +
                        '   <div class="modal-dialog">' +
                        '       <div class="modal-content">' +
                        '           <div class="modal-header">' +
                        '               <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                        '               <h4 class="modal-title">{{ title }}</h4>' +
                        '           </div>' +
                        '           <div class="modal-body" ng-transclude></div>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>',
            restrict: 'EA',
            transclude: true,
            replace: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    //console.log('Value - ' + value);
                    if (value === true) {
                        $(element).modal('show');
                    }
                    else {
                        $(element).modal('hide');
                    }
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        //console.log('Open');
                        //scope.$parent[attrs.visible] = true;
                        scope.$parent.vm.showModal = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        //console.log('Close');
                        //scope.$parent[attrs.visible] = false;
                        scope.$parent.vm.showModal = false;
                    });
                });
            }
        };
        return directive;
    }
})();
