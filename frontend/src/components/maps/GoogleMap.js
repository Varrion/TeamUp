import {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import {CircularProgress} from "@material-ui/core";

const GoogleMap = ({longitude, latitude, onMarkerChange, hideLongitudeLatitude, height, allowScrolling = false}) => {
    const mapOptions = (maps) => {
        return {
            streetViewControl: false,
            scaleControl: true,
            fullscreenControl: false,
            styles: [{
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }],
            gestureHandling: "greedy",

            mapTypeControl: true,
            mapTypeId: maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.BOTTOM_CENTER,
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID
                ]
            },

            zoomControl: true,
            clickableIcons: false,
            scrollwheel: allowScrolling,
        };
    }


    const [googleMap, setGoogleMap] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        places: [],
        center: [],
        zoom: 15,
        lat: latitude ?? null,
        lng: longitude ?? null
    });

    useEffect(() => {
        setCurrentLocation();
    }, [googleMap.mapApi, googleMap.mapInstance, googleMap.mapApiLoaded])

    const setCurrentLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGoogleMap({
                    ...googleMap,
                    center: [googleMap.lat ?? position.coords.latitude, googleMap.lng ?? position.coords.longitude],
                    lat: googleMap.lat ?? position.coords.latitude,
                    lng: googleMap.lng ??position.coords.longitude
                });

                onMarkerChange && onMarkerChange(googleMap.lng, googleMap.lat)
            });
        }
    }

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        onMarkerChange && setGoogleMap({
            ...googleMap,
            lat: mouse.lat,
            lng: mouse.lng
        });

        onMarkerChange && onMarkerChange(googleMap.lng, googleMap.lat)
    }

    const onMapChange = ({center, zoom}) => {
        setGoogleMap({
            ...googleMap,
            center: center,
            zoom: zoom,
        });
    }

    const onMapClick = (value) => {
        onMarkerChange && setGoogleMap({
            ...googleMap,
            lat: value.lat,
            lng: value.lng
        });

        onMarkerChange && onMarkerChange(googleMap.lng, googleMap.lat)
    }

    const apiHasLoaded = (map, maps) => {
        setGoogleMap({
            ...googleMap,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    };

    return (
        <div className={"autocomplete-wrapper"}>
            {!googleMap.lng ? <CircularProgress/> : <>
                {/*<LocationSearchInput/>*/}
                <GoogleMapReact
                    options={mapOptions}
                    style={{height: height ?? "400px", position: "relative"}}
                    center={{lat: googleMap.lat, lng: googleMap.lng}}
                    zoom={googleMap.zoom}
                    draggable={true}
                    onChange={onMapChange}
                    onChildMouseDown={onMarkerInteraction}
                    onChildMouseMove={onMarkerInteraction}
                    onClick={onMapClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyCalNLfb7dCmUzvcOmLUhMNW0D9rHz_aGk',
                        libraries: ['places'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => apiHasLoaded(map, maps)}
                >
                    <Marker
                        lat={googleMap.lat}
                        lng={googleMap.lng}
                    />
                </GoogleMapReact>

                {!hideLongitudeLatitude && <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{googleMap.lat}</span>,
                        Longitude: <span>{googleMap.lng}</span>
                    </div>
                    {/*<div className="map-details">Zoom: <span>{googleMap.zoom}</span></div>*/}
                </div>}
            </>}
        </div>
    )
}

export default GoogleMap;
