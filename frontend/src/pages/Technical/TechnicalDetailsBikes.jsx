import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBikesTechnical } from "../../hooks/technical/useBikesTechnical";
import "./Technical.scss";

const TechnicalDetailsBikes = () => {
    const { bike, setSlug, useMaintenanceBike, useMaintenanceBikeRemove } =
        useBikesTechnical();
    const { slug } = useParams();
    const [slotID, setSlotID] = useState(null);

    useEffect(() => {
        if (slug) {
            setSlug(slug);
        }
    }, [slug]);

    const bike_info = bike ? (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>{bike.name}</h2>
        </div>
    ) : (
        <div>
            <h1> No bike</h1>
        </div>
    );

    const handleHandleChange = (e) => {
        const id = e.target.value;
        setSlotID(id);
    };

    const button =
        bike?.status === "unused" ? (
            <button
                className="custom-btn btn-5"
                onClick={() => useMaintenanceBike(slug)}
            >
                <span>Put in maintenance</span>
            </button>
        ) : bike?.status === "used" ? (
            <p>The bike is in use</p>
        ) : (
            <>
                <label>Slot: </label>
                <input type="number" min={1} onChange={handleHandleChange} />
                <button
                    className="custom-btn btn-3"
                    onClick={() => useMaintenanceBikeRemove(slug, slotID)}
                >
                    <span>Put in service</span>
                </button>
            </>
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
