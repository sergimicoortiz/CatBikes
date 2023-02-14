import Stations from './station.model.js';
import Slot from '../slots/slot.model.js';
import { generateSlug } from '../../utils/utils.js';

const stationResolvers = {
    Query: {
        stationCount: async () => await Stations.count(),
        stations: async () => await Stations.findAll(),
        station: async (parent, args) => await Stations.findOne({ where: { slug: args.slug } })
    },

    Mutation: {
        addStation: async (parent, args) => {
            try {
                const station = await Stations.create({
                    name: args.name,
                    slug: generateSlug(args.name),
                    status: args.status,
                    image: args.image,
                    latitude: args.latitude,
                    longitude: args.longitude
                });
                for (let i = 0; i < args.slotCuantities; i++) {
                    Slot.create({
                        station_id: station.id,
                        status: 'unused',
                        bike_id: null
                    });
                }
                return station;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        deleteStation: async (parent, args) => {
            try {
                const station = await Stations.findOne({ where: { slug: args.slug } });
                await station.destroy();
                return station;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    },

    Station: {
        slots: async (parent) => await Slot.findAll({ where: { station_id: parent.id } }),
        total_slots: async (parent) => await Slot.count({ where: { station_id: parent.id } }),
        total_bikes: async (parent) => await Slot.count({ where: { station_id: parent.id, status: 'used' } })
    }
};

export default stationResolvers;