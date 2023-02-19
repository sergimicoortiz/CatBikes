import { useEffect, useCallback, useState, useContext } from "react";
import IncidentsContext from "../context/IncidentsContext";
import IncidentsService from "../services/IncidentsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export function useIncidents() {
    const { incidents, setIncidents } = useContext(IncidentsContext);
    const navigate = useNavigate();
    const [userIncidents, setUserIncidents] = useState([]);
    const { isAuth } = useContext(UserContext);

    useEffect(() => {
        if (isAuth) {
            IncidentsService.GetIncidentsUser()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents(data);
                    }
                })
                .catch((e) => console.error(e));
        }
    }, []);

    const updateIncident = (data) => {
        if (data[0].status == "resolved") {
            toast.error("Can't update a resolved incident");
        } else {
            IncidentsService.updateIncident(data)
                .then((dataThen) => {
                    if (dataThen.status === 200) {
                        let get_Old_Incidents = [...incidents];
                        const remove_old = get_Old_Incidents.findIndex(
                            (item) => item.slug === data[0].slug
                        );
                        if (remove_old !== -1) {
                            get_Old_Incidents[remove_old] = dataThen.data;
                            setIncidents(get_Old_Incidents);
                        }
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    const deleteIncidents = async (data) => {
        let save = [];
        for (let i = 0; i < data.length; i++) {
            try {
                await IncidentsService.deleteIncidents(data[i]);
                save.push(data[i].slug);
                toast.success("Removed");
            } catch (error) {
                toast.error("Delete error");
            }
        }
        setIncidents(incidents.filter((item) => !save.includes(item.slug)));
    };

    const useCreateIncident = useCallback((data) => {
        if (isAuth) {
            IncidentsService.CreateIncident(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        toast.success(
                            "Incident created, redirecting to the home"
                        );
                        setTimeout(() => {
                            navigate("/home");
                            window.location.reload();
                        }, 1000);
                    }
                })
                .catch((e) => console.error(e));
        }
    }, []);

    return {
        userIncidents,
        setUserIncidents,
        useCreateIncident,
        incidents,
        setIncidents,
        deleteIncidents,
        updateIncident,
    };
}
