import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSlotTechnical } from "../../hooks/technical/useSlotTechnical";
import "./Technical.scss";

const TechnicalDetailsBikes = () => {
    const { slot, setSlotId, useMaintenanceSlot, qr } = useSlotTechnical();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setSlotId(id);
        }
    }, [id]);

    const station_info = slot?.station ? (
        <h2 style={{ textAlign: "center" }}>Station: {slot.station.slug}</h2>
    ) : (
        <h1> No station</h1>
    );

    const slot_info = slot ? (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>ID: {slot.id}</h2>
            <h2 style={{ textAlign: "center" }}>Status: {slot.status}</h2>
            {station_info}
        </div>
    ) : (
        <div>
            <h1> No bike</h1>
        </div>
    );

    const button =
        slot?.status === "unused" ? (
            <button
                className="custom-btn btn-5"
                onClick={() => useMaintenanceSlot(slot.id, true)}
            >
                <span>Put in maintenance</span>
            </button>
        ) : slot?.status === "used" ? (
            <p>The slot is in use</p>
        ) : (
            <>
                <button
                    className="custom-btn btn-3"
                    onClick={() => useMaintenanceSlot(slot.id, false)}
                >
                    <span>Put in service</span>
                </button>
            </>
        );

    const qrCode = qr?.slotQR ? (
        <div>
            <br />
            <img src={qr.slotQR} />
            <br />
            <a download={`${slot.id}.png`} href={qr.slotQR}>
                Download
            </a>
        </div>
    ) : (
        <p>no qr</p>
    );

    return (
        <div>
            <h1> Details Slot</h1>
            {slot_info}
            {button}
            {qrCode}
        </div>
    );
};

export default TechnicalDetailsBikes;
