import React from "react";
import { useNavigate } from "react-router-dom";
import "./Technical.scss";

const Technical = () => {
    const navigate = useNavigate();

    const redirects = {
        slots: () => navigate("/technical/slots"),
        bikes: () => navigate("/technical/bikes"),
    };

    return (
        <div>
            <h1>Technical</h1>
            <button
                className="custom-btn btn-3"
                onClick={() => redirects.bikes()}
            >
                <span>List Bikes</span>
            </button>
            <button
                className="custom-btn btn-3"
                onClick={() => redirects.slots()}
            >
                <span>List Slots</span>
            </button>
        </div>
    );
};

export default Technical;
