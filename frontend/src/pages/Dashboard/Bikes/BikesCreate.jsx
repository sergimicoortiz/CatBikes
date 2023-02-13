import React from "react";

import { useBikes } from "../../../hooks/useBikes";
import { useNavigate } from "react-router-dom";
import BikesForm from "../../../components/Dashboard/Bikes/BikesForm";

const BikesList = () => {
    const { createBike } = useBikes();
    const navigate = useNavigate();

    return (
        <div>
            <BikesForm sendData={(data) => createBike(data)} />
        </div>
    );
}

export default BikesList;