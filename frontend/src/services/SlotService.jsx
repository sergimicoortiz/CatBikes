import Api from "./Api";

const getAll = (params = null) => {
  return Api().get("/slot", { params: params });
};

const getOne = (id) => {
  return Api().get("/slot/" + id);
};

const returnBikeBackend = (slug, id) => {
  return Api().put("/bikes/" + slug, { 'bike': { status: 'unused' }, 'slot': { 'id': id } });
};

const rentBikeBackend = (id) => {
  return Api().put("/slot/detach_bike/" + id);
};

const updateStatus = (id, status) => {
  return Api().put('/slot/status/' + id, { 'slot': { 'status': status } });
}

const SlotService = {
  getAll,
  getOne,
  returnBikeBackend,
  rentBikeBackend,
  updateStatus
};

export default SlotService;