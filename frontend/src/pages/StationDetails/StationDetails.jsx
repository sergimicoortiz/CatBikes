import React, { useEffect, useState } from "react";
import "../StationsClient/StationsClientList.scss";
import { useParams } from "react-router-dom";
import { useStations } from "../../hooks/useStations";
import goodImage from "../../img/SlotEmpty.png";
import usedImage from "../../img/SlotUsed.png";
import maintenanceImage from "../../img/SlotMaintenance.png";
import { toast } from "react-toastify";
import { useRent } from "../../hooks/useRent";
import { useNavigate } from "react-router-dom";
import IncidentModal from "../../components/Incidents/IncidentModal";
import JwtService from "../../services/JwtService";

const StationDetails = () => {
    const { slug } = useParams();
    const { useOneStation, slotStation } = useStations();
    const { rentBike, returnBike } = useRent();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalSlot, setModalSlot] = useState(null);

    useEffect(function () {
        useOneStation(slug);
    }, []);

    const clickModal = (slot_id) => {
        setModalOpen(true);
        setModalSlot(slot_id);
    };

    const rentId = (data) => {
        if (JwtService.getToken()) {
            if (data.status == "used") {
                rentBike(data);
            } else if (data.status == "unused") {
                returnBike(data);
            } else {
                toast.error("This slot is in maintenance, take another one");
            }
        } else {
            toast.error("You must be logged");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };

    let SlotCard = null;

    const incidence_btn = (id) =>
        JwtService.getToken() ? (
            <button className="btn" onClick={() => clickModal(id)}>
                Open incidence
            </button>
        ) : (
            ""
        );
    if (slotStation.length > 0) {
        SlotCard = slotStation.map((item) => {
            const img =
                item.status === "used"
                    ? goodImage
                    : item.status === "unused"
                    ? usedImage
                    : maintenanceImage;
            return (
                <div
                    className="card"
                    key={item.id}
                    style={{ backgroundImage: `url(${img})` }}
                >
                    <div className="content">
                        <p className="copy">Slot: {item.status}</p>
                        <button
                            className="btn"
                            onClick={() => {
                                rentId(item);
                            }}
                        >
                            {item.status == "unused" ? (
                                <a>Return Bike</a>
                            ) : item.status == "used" ? (
                                <a>Rent Bike</a>
                            ) : (
                                "Maintenance"
                            )}
                        </button>
                        {incidence_btn(item.id)}
                    </div>
                </div>
            );
        });
    } else {
        SlotCard = <p>No slots available</p>;
    }

    return (
        <div className="stationsClientCard">
            <IncidentModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                slot_id={modalSlot}
            />
            <main className="page-content">{SlotCard}</main>
        </div>
    );
};

export default StationDetails;
