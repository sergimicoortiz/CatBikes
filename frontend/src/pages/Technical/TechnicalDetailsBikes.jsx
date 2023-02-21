import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBikesTechnical } from "../../hooks/technical/useBikesTechnical";
import "./Technical.scss";

const TechnicalDetailsBikes = () => {
    const { bike, setSlug, useMaintenanceBike } = useBikesTechnical();
    const { slug } = useParams();
    useEffect(() => {
        if (slug) {
            setSlug(slug);
        }
    }, [slug]);

    const bike_info = bike ? (
        <div>
            <h1>{bike.name}</h1>
            <h2>{bike.status}</h2>
        </div>
    ) : (
        <div>
            <h1> No bike</h1>
        </div>
    );

    const button =
        bike?.status == "unused" ? (
            <button
                className="custom-btn btn-5"
                onClick={() => useMaintenanceBike(slug)}
            >
                <span>Put in maintenance</span>
            </button>
        ) : (
            <button
                className="custom-btn btn-3"
                onClick={() => useMaintenanceBike(slug)}
            >
                <span>Put in service</span>
            </button>
        );

    return (
        <div>
            <h1> Details Bikes</h1>
            {bike_info}
            {button}
        </div>
    );
};

export default TechnicalDetailsBikes;
