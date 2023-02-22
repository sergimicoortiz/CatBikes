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

    const station_info = bike?.Slot?.station ? (
        <>
            <h2 style={{ textAlign: "center" }}>
                Station: {bike.Slot.station.slug}
            </h2>
        </>
    ) : (
        <>
            <h2 style={{ textAlign: "center" }}> No station</h2>
        </>
    );

    const slot_info = bike?.Slot ? (
        <>
            <h2 style={{ textAlign: "center" }}>Slot: {bike.Slot.id}</h2>
        </>
    ) : (
        <>
            <h2 style={{ textAlign: "center" }}> No slot</h2>
        </>
    );

    const bike_info = bike ? (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>Name:{bike.name}</h2>
            <h2 style={{ textAlign: "center" }}>Status:{bike.status}</h2>
            {slot_info}
            {station_info}
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
