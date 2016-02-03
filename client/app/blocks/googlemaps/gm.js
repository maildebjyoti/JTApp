(function () {
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
            initMap: initMap,
            centerMap: centerMap,
            setZoom: setZoom,
            confirmMarker: confirmMarker,
            addMarker: addMarker,
            delMarker: delMarker,
            clearMarkers: clearMarkers,
            showMarkers: showMarkers,
            deleteMarkers: deleteMarkers,
            geocode: geocode,
            geocodeLatLng: geocodeLatLng,
            distancematrix: distancematrix,
            direction: direction,
            getNearbyPlaces: init,
            plotRoad: init,
            infowindow: init
        };
        var map, _id = 'map',
            _zoom = 5;
        var center = {
            Lat: 13.9132602,
            Lng: 100.60419869999998
        };
        var markers = [];
        var mapOptions, geocoder, infowindow;

        setTimeout(function () {
            mapOptions = {
                zoom: _zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(center.Lat, center.Lng),
                disableDefaultUI: true,
                //mapTypeControl: false,
                zoomControl: true
            };

            geocoder = new google.maps.Geocoder();
            infowindow = new google.maps.InfoWindow();
        }, 500);

        return service;
        /////////////////////

        function initMap() {
            if (enableGM) {
                setTimeout(function () {
                    map = new google.maps.Map(document.getElementById(_id), mapOptions);

                    //https://developers.google.com/maps/documentation/javascript/events?hl=en#removing
                    var clickListener = map.addListener('click', function (event) {
                        confirmMarker(event);
                    });

                    getLocation();
                }, 500);
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

        function centerMap(lat, lng) {
            var center = new google.maps.LatLng(lat, lng);
            map.panTo(center);
        }

        function setZoom(zoom) {
            map.setZoom(zoom);
        }

        function geocode(address, callbackFn, index) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    //map.setCenter(results[0].geometry.location);
                    callbackFn(results[0], index);
                    addMarker(results[0].geometry.location, results[0].formatted_address);
                    fitBounds();
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        function geocodeLatLng(location) {
            var latlng = {
                lat: location.lat(),
                lng: location.lng()
            };
            geocoder.geocode({
                'location': latlng
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //TODO - call modal service
                        if (confirm("Do you want to add the location - " + results[1].formatted_address + " ?") == true) {
                            addMarker(location, results[1].formatted_address);
                        }
                    } else {
                        console.log('No results found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        }

        //https://developers.google.com/maps/documentation/javascript/examples/marker-remove
        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function confirmMarker(event){
            //console.log('fn:confirmMarker -- Clicked - ' + event.latLng);
            geocodeLatLng(event.latLng);
        }

        function addMarker(location, locDetails) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);

            //TODO: Add event for Infobox
            google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        if(typeof locDetails === 'undefined'){
                            locDetails = '';
                        }
                        infowindow.setContent(locDetails);
                        infowindow.open(map, marker);
                    };
                })(marker));
        }

        function delMarker(index){

        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Shows any markers currently in the array.
        function showMarkers() {
            setMapOnAll(map);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }

        function fitBounds(){
            var bounds = new google.maps.LatLngBounds();
            for(var i=0; i<markers.length; i++){
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        }

        /*function DrawMarkers(locations) {
            //console.log('Draw Markers --');
            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    };
                })(marker, i));
            }
        }*/

        function distancematrix(){
            /*
                https://maps.googleapis.com/maps/api/distancematrix/json?
                    origins=Vancouver+BC|Seattle
                    &destinations=San+Francisco|Victoria+BC
                    &mode=bicycling
                    &language=en-US
                    &key=AIzaSyAfGrs-gfTLtPsrw86Xsv7lb7MrgGw7WIc
            */
        }

        function direction(){
            /*

            */
        }

        function init() {
            if (enableGM) {
                console.log('Init - Google Maps')
            }
        }
    }
}());
