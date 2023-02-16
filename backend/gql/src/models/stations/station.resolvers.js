import Stations from './station.model.js';
import Slot from '../slots/slot.model.js';
import { GraphQLError } from 'graphql';
import { generateSlug } from '../../utils/utils.js';

const stationResolvers = {
    Query: {
        stationCount: async () => await Stations.count(),
        stations: async () => await Stations.findAll(),
        station: async (parent, args) => await Stations.findOne({ where: { slug: args.slug } })
    },

    Mutation: {
        addStation: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
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
                throw new GraphQLError('Error adding station', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
            }
        },
        deleteStation: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
                const station = await Stations.findOne({ where: { slug: args.slug } });
                await Slot.destroy({ where: { station_id: station.id } });
                await station.destroy();
                return station;
            } catch (error) {
                console.error(error);
                throw new GraphQLError('Error delete station', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
            }
        },

        updateStation: async (parent, args, context) => {
            const { slug, name, status, image, latitude, longitude } = args;
            try {
                if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
                if (!name && !status && !image && !latitude && !longitude) throw new GraphQLError('No data provided for station update', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
                const station = await Stations.findOne({ where: { slug } });
                if (!station) throw new Error('Station not found');
                if (name) station.name = name;
                if (status) station.status = status;
                if (image) station.image = image;
                if (latitude) station.latitude = latitude;
                if (longitude) station.longitude = longitude;
                await station.save();
                return station;
            } catch (error) {
                console.error(error);
                throw new GraphQLError('Error update station', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
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