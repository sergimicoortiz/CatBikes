import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/UserContext";

export function TechnicalGuard() {
    const { isTechnical } = useContext(UserContext);
    return isTechnical ? <Outlet /> : <Navigate to="/home" />;
}
