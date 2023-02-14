import Stations from './station.model.js';
import Slot from '../slots/slot.model.js';

const stationResolvers = {
    Query: {
        stationCount: async () => await Stations.count(),
        stations: async () => await Stations.findAll(),
        station: async (parent, args) => await Stations.findOne({ where: { slug: args.slug } })
    },

    Station: {
        slots: async (parent) => await Slot.findAll({ where: { station_id: parent.id } }),
        total_slots: async (parent) => await Slot.count({ where: { station_id: parent.id } }),
        total_bikes: async (parent) => await Slot.count({ where: { station_id: parent.id, status: 'used' } })
    }
};

export default stationResolvers;