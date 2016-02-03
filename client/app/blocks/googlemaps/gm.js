(function() {
    'use strict';

    var enableGM = true;
    angular
        .module('blocks.gm')
        //.run(init)
        .factory('gm', gm);

    gm.$inject = [];

    /* @ngInject */
    function gm() {
        var service = {
            initMap : initMap,
            centerMap : centerMap,
            setZoom : setZoom,
            confirmMarker: init,
            addMarker: init,
            delMarker: init,
            plotMarkers: init,
            clearMarkers: init,
            geocoder: init,
            getDistance: init,
            getDirection: init,
            getNearbyPlaces: init,
            plotRoad: init,
            infowindow: init
        };
        var map, _id = 'map', _zoom = 8;
        var center = {
            Lat: 13.9132602,
            Lng: 100.60419869999998
        };

        var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        return service;
        /////////////////////

        function initMap() {
            if(enableGM){
                map = new google.maps.Map(document.getElementById(_id), {
                    zoom: _zoom,
                    center: new google.maps.LatLng(center.Lat, center.Lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var clickListener = map.addListener('click', function (event) {
                    console.log('Clicked - ' + event.latLng);
                    //addMarker(event.latLng);
                });

                //https://developers.google.com/maps/documentation/javascript/events?hl=en#removing
                getLocation();
            }
        }

        function getLocation() {
            function showPosition(position) {
                centerMap(position.coords.latitude, position.coords.longitude);
            }

            function showError(error) {
                return center;
            }

            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }

        function centerMap(lat, lng){
            var center = new google.maps.LatLng(lat, lng);
            map.panTo(center);
        }

        function setZoom(zoom){
            map.setZoom(zoom);
        }
    }

    function init(){
        if(enableGM){
            console.log('Init - Google Maps')
        }
    }
}());