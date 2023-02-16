import Slot from "../slots/slot.model.js";
import Bike from "../bikes/bike.model.js";
import Rent from "./rent.model.js";
import User from "../user/user.model.js";
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const rentResolvers = {
    Query: {
        rents: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                if (context.isAdmin) return await Rent.findAll();
                return await Rent.findAll({ where: { user_id: context.user.id } });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        },
    },

    Mutation: {
        startRent: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const { start_slot_id } = args;
                const user_id = context.user.id;
                const count = await Rent.count({ where: { user_id, end_slot_id: null } });
                if (count > 0) throw new GraphQLError("User already has a rent", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                const start_slot = await Slot.findByPk(start_slot_id);
                if (!start_slot) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                if (start_slot.bike_id === null) throw new GraphQLError("Slot is empty", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                const bike = await Bike.findByPk(start_slot.bike_id);
                if (!bike) throw new GraphQLError("Bike not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                if (bike.status === "used") throw new GraphQLError("Bike is in use", { extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR } });
                const rent = await Rent.create({ bike_id: start_slot.bike_id, start_slot_id, user_id });
                bike.status = "used";
                await bike.save();
                start_slot.bike_id = null;
                start_slot.status = "unused";
                await start_slot.save();
                return rent;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        endRent: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const { end_slot_id } = args;
                const user_id = context.user.id;
                const rent = await Rent.findOne({ where: { user_id, end_slot_id: null } });
                if (!rent) throw new GraphQLError("Rent not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                const end_slot = await Slot.findByPk(end_slot_id);
                const bike = await Bike.findByPk(rent.bike_id);
                if (!bike) throw new GraphQLError("Bike not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                if (!end_slot) throw new GraphQLError("Slot not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                if (end_slot.bike_id !== null) throw new GraphQLError("Slot is not empty", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                rent.end_slot_id = end_slot_id;
                rent.end_date = new Date();
                await rent.save();
                bike.status = "unused";
                await bike.save();
                end_slot.bike_id = bike.id;
                end_slot.status = "used";
                await end_slot.save();
                return rent;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        deleteRent: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { id } = args;
                const rent = await Rent.findByPk(id);
                if (!rent) throw new GraphQLError("Rent not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                if (rent.end_slot_id === null) throw new GraphQLError("Rent is not ended", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                await rent.destroy();
                return rent;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }
    },

    Rent: {
        bike: async (parent) => await Bike.findByPk(parent.bike_id),
        start_slot: async (parent) => await Slot.findByPk(parent.start_slot_id),
        end_slot: async (parent) => await Slot.findByPk(parent.end_slot_id),
        user: async (parent) => await User.findByPk(parent.user_id),
    },
};

export default rentResolvers;