import React from "react";
import './Dashboard.scss';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const redirects = {
        stations: () => navigate('/dashboard/stations'),
        bikes: () => navigate('/dashboard/bikes'),
        slots: () => navigate('/dashboard/slots'),
        rent: () => navigate('/dashboard/rent'),
        incidents: () => navigate('/dashboard/incidents'),
    }
    return (
        <div className="frame">
            <button className="custom-btn btn-3" onClick={() => redirects.stations()}><span>List Stations</span></button>
            <button className="custom-btn btn-3" onClick={() => redirects.bikes()}><span>List Bikes</span></button>
            <button className="custom-btn btn-3" onClick={() => redirects.slots()}><span>List Slots</span></button>
            <button className="custom-btn btn-3" onClick={() => redirects.rent()}><span>List Rents</span></button>
            <button className="custom-btn btn-3" onClick={() => redirects.incidents()}><span>List Incidents</span></button>
        </div>
    )
}

export default Dashboard