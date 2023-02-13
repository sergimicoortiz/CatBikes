import React, { useState, useEffect } from "react";
import secrets from "../../secrets";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './MapStation.scss';
const MapDashboard = ({ latitude, longitude, handleChange }) => {
    const [firstClick, setFirstClick] = useState(true);
    const [lon, setLon] = useState(90);
    const [lat, setLat] = useState(90);

    useEffect(() => {
        if (latitude && longitude) {
            setFirstClick(false);
            setLon(longitude);
            setLat(latitude);
        }
    }, [longitude, latitude]);

    useEffect(() => {
        if (lat !== 90 && lon !== 90) {
            handleChange({ 'longitude': lon, 'latitude': lat });
        }
    }, [lat, lon]);

    const handleClick = (data) => {
        if (firstClick) {
            setFirstClick(false);
            setLon(data.lngLat.lng);
            setLat(data.lngLat.lat);
        }
    }

    const handleDrag = (data) => {
        setLon(data.lngLat.lng);
        setLat(data.lngLat.lat);
    }

    return (
        <div className="map">
            <Map
                mapboxAccessToken={secrets.MAP_TOKEN}
                onClick={handleClick}
                initialViewState={{
                    longitude: -0.603908,
                    latitude: 38.822944,
                    zoom: 14
                }}
                style={{ width: 800, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker latitude={lat} longitude={lon} draggable={true} onDragEnd={handleDrag} />
            </Map>
        </div>
    )
}

export default MapDashboard;