import React from "react";
import('./StationsCreate.scss');
import StationForm from "../../../components/Dashboard/Stations/StationsForm";
import { useStations } from "../../../hooks/useStations";

const StationsCreate = () => {
    const { useCreateStation } = useStations();
    return (
        <div className="stationCreate">
            <h1>STATION CREATE</h1>
            <StationForm SendData={(data) => useCreateStation(data)} />
        </div>
    )
}

export default StationsCreate;