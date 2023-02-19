import React, { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import UserService from "../UserService";

if (sessionStorage.getItem("path")) {
    sessionStorage.removeItem("path");
}

export function NoAuthGuard() {
    const { isAuth } = useContext(UserContext);
    return !isAuth ? <Outlet /> : <Navigate to="/home" />;
}

export function AuthGuard() {
    const navigate = useNavigate();
    const { isAuth } = useContext(UserContext);

    if (!isAuth) {
        UserService.GetUser().then(({ status }) => {
            if (status == 200) {
                setTimeout(() => {
                    navigate(sessionStorage.getItem("/profile"));
                }, 800);
            }
        });
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
