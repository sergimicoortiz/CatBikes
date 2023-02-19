import React from "react";

import { useBikes } from "../../../hooks/useBikes";
import BikesForm from "../../../components/Dashboard/Bikes/BikesForm";

const BikesList = () => {
    const { createBike } = useBikes();

    return (
        <div>
            <BikesForm sendData={(data) => createBike(data)} />
        </div>
    );
};

export default BikesList;