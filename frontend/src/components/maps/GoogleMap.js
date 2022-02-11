import {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import {CircularProgress} from "@material-ui/core";

const GoogleMap = ({onMarkerChange}) => {
    const [googleMap, setGoogleMap] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        places: [],
        center: [],
        zoom: 9,
        address: '',
        lat: null,
        lng: null
    });

    useEffect(() => {
        setCurrentLocation();
    }, [googleMap.mapApi, googleMap.mapInstance, googleMap.mapApiLoaded])

    const setCurrentLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGoogleMap({
                    ...googleMap,
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                onMarkerChange(googleMap.lng, googleMap.lat)
            });
        }
    }

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setGoogleMap({
            ...googleMap,
            lat: mouse.lat,
            lng: mouse.lng
        });

        onMarkerChange(googleMap.lng, googleMap.lat)
    }

    const onMapChange = ({center, zoom}) => {
        setGoogleMap({
            ...googleMap,
            center: center,
            zoom: zoom,
        });
    }

    const onMapClick = (value) => {
        setGoogleMap({
            ...googleMap,
            lat: value.lat,
            lng: value.lng
        });

        onMarkerChange(googleMap.lng, googleMap.lat)
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
                    style={{height: "400px", position: "relative"}}
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

                <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{googleMap.lat}</span>,
                        Longitude: <span>{googleMap.lng}</span>
                    </div>
                    {/*<div className="map-details">Zoom: <span>{googleMap.zoom}</span></div>*/}
                </div>
            </>}
        </div>
    )
}

export default GoogleMap;