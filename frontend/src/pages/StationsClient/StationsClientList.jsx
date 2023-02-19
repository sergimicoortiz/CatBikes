import React from "react";
import { useStations } from "../../hooks/useStations";
import { useNavigate } from "react-router-dom";
import "./StationsClientList.scss";

const StationsClientList = () => {
    const { stations } = useStations();
    const navigate = useNavigate();

    const StationCard = stations.map(item =>
        <div className="card" key={item.id} style={{ backgroundImage: `url(${item.image})` }}>
            <div className="content">
                <h2 className="title">{item.name}</h2>
                {/* <p className="copy">Pos: {`lon: ${item.longitude} lat: ${item.latitude}`}</p> */}
                <p className="copy">Status: {item.status}</p>
                <span className="copy">Total Slots: {item.total_slots}</span>
                <span className="copy">Bikes for Rent: {item.total_bikes}</span>
                <button className="btn" onClick={() => {
                    navigate("/stations/" + item.slug);
                }
                }>Show Bikes</button>
            </div>
        </div>
    );

    return (
        <div className="stationsClientCard">
            <main className="page-content">
                {StationCard}
            </main>
        </div>
    );
};

export default StationsClientList;
