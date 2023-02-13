import Api from './Api';

const StationService = {

    GetStations() {
        return Api().get('station');
    },

    CreateStations(data, slot_quantity = 0) {
        return Api().post('station', { 'station': data, 'slot': { 'quantity': slot_quantity } });
    },

    GetStation(slug) {
        return Api().get(`station/${slug}`);
    },

    DeleteStation(slug) {
        return Api().delete(`station/${slug}`);
    },

    UpdateStation(slug, data) {
        return Api().put(`station/${slug}`, { 'station': data });
    },

}

export default StationService;