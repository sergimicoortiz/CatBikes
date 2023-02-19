import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = (token) => {
    const api = axios.create({
        baseURL: process.env.DRF_URL || "http://localhost:8000/api/",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return api;
};

export default api;
