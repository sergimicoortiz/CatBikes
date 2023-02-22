import React, { useContext } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../context/UserContext";
import UserService from "../UserService";

export function TechnicalGuard() {
    const { isTechnical } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isTechnical) {
        UserService.GetUser().then(({ data, status }) => {
            if (status == 200) {
                if (data.user.types === "technical") {
                    const path = location["pathname"].split("/")[2] || "";
                    const path_slug = location["pathname"].split("/")[3] || "";
                    setTimeout(() => {
                        navigate("/technical/" + path + "/" + path_slug);
                    }, 800);
                }
            }
        });
    }

    return isTechnical ? <Outlet /> : <Navigate to="/home" />;
}
