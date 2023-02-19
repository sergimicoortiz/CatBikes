import Api from "./Api";

const getAll = () => {
    return Api().get("/bikes");
};

const getOne = (slug) => {
    return Api().get("/bikes/" + slug);
};

const createBike = (data) => {
    return Api().post("/bikes", { bike: data });
};

const updateBike = (data, slug) => {
    return Api().put("/bikes/" + slug, { bike: data });
};

const deleteBike = (data) => {
    return Api().delete("/bikes/" + data.slug);
};

const BikeService = {
    getAll,
    getOne,
    createBike,
    deleteBike,
    updateBike,
};

export default BikeService;
