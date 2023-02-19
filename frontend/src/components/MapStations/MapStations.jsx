import React, { useContext } from "react";
import secrets from "../../secrets";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapStation.scss";
import StationContext from "../../context/StationsContext";
import MarkerStation from "./MarkerStation";
const MapStations = () => {
    const { stations } = useContext(StationContext);
    const StationsMarkers = stations.map((item) => (
        <MarkerStation key={item.slug} station={item} />
    ));
    return (
        <div className="map">
            <Map
                mapboxAccessToken={secrets.MAP_TOKEN}
                initialViewState={{
                    longitude: -0.603908,
                    latitude: 38.822944,
                    zoom: 14,
                }}
                style={{ width: 800, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <NavigationControl />
                {StationsMarkers}
            </Map>
        </div>
    );
};

export default MapStations;
