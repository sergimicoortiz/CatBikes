import Bike from "./bike.model.js";
import Slot from '../slots/slot.model.js';
import { generateSlug } from '../../utils/utils.js';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const bikeResolvers = {
    Query: {
        bike: async (parent, args) => await Bike.findOne({ where: { slug: args.slug } }),
        bikes: async () => await Bike.findAll(),
        bikesStatus: async (parent, args) => await Bike.findAll({ where: { status: args.status } })
    },

    Bike: {
        Slot: async (parent) => await Slot.findOne({ where: { bike_id: parent.id } })
    },

    Mutation: {
        createBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { name, slot_id } = args;
                const slug = generateSlug(name);
                const status = 'used';
                const bike = await Bike.create({ name, slug, status });
                if (slot_id) {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    if (!slot) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    if (slot.bike_id) throw new GraphQLError("Slot already used", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    slot.bike_id = bike.id;
                    slot.status = 'used';
                    bike.status = 'unused';
                    await slot.save();
                    await bike.save();
                }
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        deleteBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const bike = await Bike.findOne({ where: { slug: args.slug } });
                if (!bike) throw new GraphQLError("Bike not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                const slot = await Slot.findOne({ where: { bike_id: bike.id } });
                if (slot) {
                    slot.bike_id = null;
                    slot.status = 'unused';
                    await slot.save();
                }
                await bike.destroy();
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        updateBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { slug, name, slot_id } = args;
                if (!name && !slot_id) throw new GraphQLError("No data to update", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                const bike = await Bike.findOne({ where: { slug } });
                if (!bike) throw new GraphQLError("Bike not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                if (name) bike.name = name;

                if (slot_id && bike.status === 'used') {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    if (!slot) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    if (slot.bike_id) throw new GraphQLError("Slot already used", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    slot.bike_id = bike.id;
                    slot.status = 'used';
                    bike.status = 'unused';
                    await slot.save();
                }

                if (slot_id && bike.status === 'unused') {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    if (!slot) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    if (slot.bike_id) throw new GraphQLError("Slot already used", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                    const slot_old = await Slot.findOne({ where: { bike_id: bike.id } });
                    if (!slot_old) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });

                    slot_old.bike_id = null;
                    slot_old.status = 'unused';
                    await slot_old.save();

                    slot.bike_id = bike.id;
                    slot.status = 'used';
                    bike.status = 'unused';
                    await slot.save();
                }

                await bike.save();
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }
};

export default bikeResolvers;