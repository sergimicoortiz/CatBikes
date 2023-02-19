import React, { useEffect } from "react";

import { useBikes } from "../../../hooks/useBikes";
import { useParams } from "react-router-dom";
import BikesForm from "../../../components/Dashboard/Bikes/BikesForm";

const BikesList = () => {
    const { slug } = useParams();
    const { updateBikes, getOneBike, oneBike } = useBikes(slug);

    useEffect(function () {
        getOneBike(slug);
    }, []);

    return (
        <BikesForm
            oneBike={oneBike}
            sendData={(data) => updateBikes(data, slug)}
        />
    );
};

export default BikesList;
