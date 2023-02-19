import React, { useState, useEffect, useContext } from "react";
import NotificationsService from "../services/NotificationsService";
import UserContext from "./UserContext";
import IncidentsContext from "./IncidentsContext";

const Context = React.createContext({});

export function NotificationsContextProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const { token } = useContext(UserContext);
    const { incidents } = useContext(IncidentsContext);

    useEffect(
        function () {
            if (token) {
                NotificationsService.getAll().then(({ data }) => {
                    setNotifications(data);
                });
            }
        },
        [setNotifications, token, incidents]
    );

    return (
        <Context.Provider value={{ notifications, setNotifications }}>
            {children}
        </Context.Provider>
    );
}

export default Context;
