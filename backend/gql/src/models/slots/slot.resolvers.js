import Slot from "../slots/slot.model.js";
import Station from "../stations/station.model.js";
import Bike from "../bikes/bike.model.js";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { generateQR } from "../../utils/utils.js";

const slotResolvers = {
    Query: {
        slots: async (parent, args) => {
            const { status } = args;
            if (status) return await Slot.findAll({ where: { status } });
            return await Slot.findAll();
        },
        slot: async (parent, args) => await Slot.findByPk(args.id),
        slotQR: async (parent, args, context) => {
            try {
                if (context.isAdmin || context.isTechnical) {
                    const slot = await Slot.findByPk(args.id);
                    if (!slot)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.BAD_USER_INPUT,
                            },
                        });
                    return generateQR("slots", slot.id);
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },

    Slot: {
        station: async (parent) => await Station.findByPk(parent.station_id),
        bike: async (parent) => await Bike.findByPk(parent.bike_id),
    },

    Mutation: {
        createSlot: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { station_id } = args;
                const status = "unused";
                const station = await Station.findByPk(station_id);
                if (!station)
                    throw new GraphQLError("Station not found", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });
                const slot = await Slot.create({ status, station_id });
                return slot;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        deleteSlot: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const slot = await Slot.findByPk(args.id);
                if (!slot)
                    throw new GraphQLError("Slot not found", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });
                const bike = await Bike.findByPk(slot.bike_id);
                if (bike) {
                    bike.status = "used";
                    await bike.save();
                }
                await Slot.destroy({ where: { id: args.id } });
                return slot;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        setMaintenanceSlot: async (parent, args, context) => {
            try {
                if (context.isAdmin || context.isTechnical) {
                    const slot = await Slot.findByPk(args.id);
                    if (!slot)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.BAD_USER_INPUT,
                            },
                        });
                    if (slot.bike_id)
                        throw new GraphQLError("Slot is in use", {
                            extensions: {
                                code: ApolloServerErrorCode.BAD_USER_INPUT,
                            },
                        });
                    slot.status = args.maintenance ? "maintenance" : "unused";
                    await slot.save();
                    return slot;
                } else {
                    throw context.AuthenticationError;
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },
};

export default slotResolvers;
