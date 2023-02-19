import Api from "./Api";

const GetRentDashboard = () => {
    return Api().get("rentDashboard");
};

const DeleteRentDashboard = (id) => {
    return Api().delete("rentDashboard/" + id);
};

const getOneRent = () => {
    return Api().get("getOneRent");
};

const rentBike = (data) => {
    return Api().post("rent", { rentBike: { start_slot: data.id } });
};

const returnBike = (data) => {
    return Api().post("returnBike", {
        returnBike: { end_slot: data.id, bike_id: data.bike_id },
    });
};

const RentService = {
    getOneRent,
    rentBike,
    returnBike,
    GetRentDashboard,
    DeleteRentDashboard,
};

export default RentService;
