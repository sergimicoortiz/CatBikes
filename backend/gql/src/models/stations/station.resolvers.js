import { ApolloServerErrorCode } from "@apollo/server/errors";
import Stations from "./station.model.js";
import Slot from "../slots/slot.model.js";
import { GraphQLError } from "graphql";
import { generateSlug } from "../../utils/utils.js";

const stationResolvers = {
    Query: {
        stationCount: async () => await Stations.count(),
        stations: async () => await Stations.findAll(),
        station: async (parent, args) =>
            await Stations.findOne({ where: { slug: args.slug } }),
    },

    Mutation: {
        addStation: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const station = await Stations.create({
                    name: args.name,
                    slug: generateSlug(args.name),
                    status: args.status,
                    image: args.image,
                    latitude: args.latitude,
                    longitude: args.longitude,
                });
                for (let i = 0; i < args.slotCuantities; i++) {
                    Slot.create({
                        station_id: station.id,
                        status: "unused",
                        bike_id: null,
                    });
                }
                return station;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        deleteStation: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const station = await Stations.findOne({
                    where: { slug: args.slug },
                });
                if (!station)
                    throw new GraphQLError("Station not found", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                await Slot.destroy({ where: { station_id: station.id } });
                await station.destroy();
                return station;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        updateStation: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { slug, name, status, image, latitude, longitude } = args;
                if (!name && !status && !image && !latitude && !longitude)
                    throw new GraphQLError("No data to update", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });
                const station = await Stations.findOne({ where: { slug } });
                if (!station)
                    throw new GraphQLError("Station not found", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                if (name) station.name = name;
                if (status) station.status = status;
                if (image) station.image = image;
                if (latitude) station.latitude = latitude;
                if (longitude) station.longitude = longitude;
                await station.save();
                return station;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },

    Station: {
        slots: async (parent) =>
            await Slot.findAll({ where: { station_id: parent.id } }),
        total_slots: async (parent) =>
            await Slot.count({ where: { station_id: parent.id } }),
        total_bikes: async (parent) =>
            await Slot.count({
                where: { station_id: parent.id, status: "used" },
            }),
    },
};

export default stationResolvers;
