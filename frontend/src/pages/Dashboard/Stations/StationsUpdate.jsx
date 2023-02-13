import React, { useEffect } from "react";
import('./StationsUpdate.scss');
import StationsForm from "../../../components/Dashboard/Stations/StationsForm";
import { useStations } from "../../../hooks/useStations";
import { useParams } from "react-router-dom";

const StationsUpdate = () => {
    const { slug } = useParams();
    const { useUpdateStation, useOneStation, oneStation } = useStations();

    useEffect(() => {
        if (oneStation.slug !== '') {
            useOneStation(slug);
        }
    }, []);

    return (
        <div className="updateStation">
            <h1>STATION UPDATE</h1>
            <StationsForm SendData={(data) => useUpdateStation(slug, data)} station={oneStation} />
        </div>
    )
}

export default StationsUpdate;