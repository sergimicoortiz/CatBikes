import React from "react";
import "./Home.scss";
import CaruselStations from "../../components/Carusel/CaruselStations";
import InfiniteScrollStations from "../../components/InfiniteScrollStations/InfiniteScrollStations";
import MapStations from "../../components/MapStations/MapStations";

const Home = () => {
    return (
        <div>
            <CaruselStations />
            <MapStations />
            <InfiniteScrollStations />
        </div>
    );
};

export default Home;
