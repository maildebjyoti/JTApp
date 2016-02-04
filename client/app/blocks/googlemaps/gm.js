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
            direction: direction_new,
            getNearbyPlaces: getNearbyPlaces,
            qpx: qpx
        };
        var map, _id = 'map',
            _zoom = 5;
        var center = {
            Lat: 13.9132602,
            Lng: 100.60419869999998
        };
        var markers = [];
        var mapOptions, geocoder, infowindow, directionsDisplay = [], directionsService;
        var gTravelMode;

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
            directionsService = new google.maps.DirectionsService();

            gTravelMode = {
                driving: google.maps.TravelMode.DRIVING,
                transit: google.maps.TravelMode.TRANSIT,
            };

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

        function confirmMarker(event) {
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
                    if (typeof locDetails === 'undefined') {
                        locDetails = '';
                    }
                    infowindow.setContent(locDetails);
                    infowindow.open(map, marker);
                };
            })(marker));
        }

        function delMarker(index) {

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

        function fitBounds() {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        }

        function distancematrix() {
            /*
                https://maps.googleapis.com/maps/api/distancematrix/json?
                    origins=Vancouver+BC|Seattle
                    &destinations=San+Francisco|Victoria+BC
                    &mode=bicycling
                    &language=en-US
                    &key=AIzaSyAfGrs-gfTLtPsrw86Xsv7lb7MrgGw7WIc
            */
        }

        var result = {};
        function direction_new(param){
            clearDirections();
            result = {
                geocoded_waypoints: [],
                request: [],
                routes: [],
                status: 'OK'
            };
            var waypts = [];
            waypts.push(param.startDetails);
            for (var i = 0; i < param.destinations.length; i++) {
                waypts.push(param.destinations[i]);
            }
            waypts.push(param.endDetails);

            for(var i=0; i<waypts.length-1; i++){
                directionsDisplay.push(new google.maps.DirectionsRenderer());
                direction(waypts[i], waypts[i+1], directionsDisplay[i], gTravelMode.transit);
            }
        }

        function direction(origin, destination, directionsDisplay, travelMode) {
            directionsDisplay.setMap(map);
            directionsService.route({
                origin: origin.loc,
                destination: destination.loc,
                travelMode: travelMode,
                drivingOptions: {
                    departureTime: new Date('2016-03-11T11:51:00'), //YYYY-MM-DDTHH:MM:SS
                    trafficModel: google.maps.TrafficModel.PESSIMISTIC // BEST_GUESS PESSIMISTIC OPTIMISTIC
                },
                transitOptions: {
                    departureTime: new Date('2016-03-11T11:51:00'), //YYYY-MM-DDTHH:MM:SS
                    //arrivalTime: new Date('2016-03-12T11:00:00'), //YYYY-MM-DDTHH:MM:SS
                    modes: [
                        google.maps.TransitMode.BUS,
                        google.maps.TransitMode.RAIL,
                        google.maps.TransitMode.SUBWAY,
                        google.maps.TransitMode.TRAIN,
                        google.maps.TransitMode.TRAM
                    ],
                    //routingPreference: google.maps.TransitRoutePreference.LESS_WALKING // LESS_WALKING FEWER_TRANSFERS
                },
                unitSystem: google.maps.UnitSystem.METRIC // METRIC IMPERIAL
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(response);
                    directionsDisplay.setDirections(response);

                    /*var route = response.routes[0];
                    var summaryPanel = document.getElementById('directions-panel');
                    summaryPanel.innerHTML = '';
                    // For each route, display summary information.
                    for (var i = 0; i < route.legs.length; i++) {
                        var routeSegment = i + 1;
                        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                            '</b><br>';
                        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    }*/
                } else {
                    if(status === 'ZERO_RESULTS'){
                        if(travelMode == gTravelMode.transit) {
                            travelMode = gTravelMode.driving;
                        }
                        else {
                            travelMode = gTravelMode.transit;
                        }
                        direction(origin, destination, directionsDisplay, travelMode);
                    }
                    else {
                        console.log('Directions request failed due to ' + status);
                    }
                }
            });

        }

        function clearDirections(){
            for(var i=0; i<directionsDisplay.length; i++){
                directionsDisplay[i].setMap(null);
            }
            directionsDisplay = [];
        }

        function qpx() {
            //'https://qpx-express-demo.itasoftware.com/'
        }

        function getNearbyPlaces(location, types, radius, callbackFn) {
            console.log(location);
            console.log(types);

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: location,
                radius: radius,
                types: types
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    /*for (var i = 0; i < results.length; i++) {
                        addMarker(results[i]);
                    }*/
                    callbackFn(results);
                } else {
                    console.log('No data found');
                }
            }
        }

        function init() {
            if (enableGM) {
                console.log('Init - Google Maps');
            }
        }
    }
}());
