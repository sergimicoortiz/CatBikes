import Api from "./Api";

const getAll = () => {
    return Api().get("/incidents");
};

const updateIncident = (data) => {
    return Api().put("/incidents/" + data[0].slug);
};

const deleteIncidents = (data) => {
    return Api().delete("/incidents/" + data.slug);
};

const CreateIncident = (data) => {
    return Api().post("incidents", { "incident": data });
};

const GetIncidentsUser = () => {
    return Api().get("incidentsUser");
};

const IncidentsService = {
    getAll,
    updateIncident,
    deleteIncidents,
    CreateIncident,
    GetIncidentsUser,
};

export default IncidentsService;