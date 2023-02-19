import Api from "./Api";

const getAll = () => {
    return Api().get("/notifications");
};

const UpdateSeen = (id) => {
    return Api().put("/notifications/" + id);
};

const NotificationsService = {
    getAll,
    UpdateSeen,
};

export default NotificationsService;
