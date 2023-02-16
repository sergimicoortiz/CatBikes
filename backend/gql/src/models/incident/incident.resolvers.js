import Slot from "../slots/slot.model.js";
import User from "../user/user.model.js";
import Incident from "./incident.model.js";
import { generateSlug } from '../../utils/utils.js';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const incidentResolvers = {
    Query: {
        incidents: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const status = args.status;
                const user_id = context.user.id;
                if (status) {
                    if (context.isAdmin) return await Incident.findAll({ where: { status: status } });
                    return await Incident.findAll({ where: { status, user_id } });
                }
                if (context.isAdmin) return await Incident.findAll();
                return await Incident.findAll({ where: { user_id } });
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },

    Mutation: {
        createIncident: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const { body, title, slot_id } = args;
                const user_id = context.user.id;
                const slug = generateSlug(title);
                const incident = await Incident.create({ body, title, slug, slot_id, user_id });
                return incident;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        updateIncident: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { id, status } = args;
                const incident = await Incident.findByPk(id);
                if (!incident) throw new GraphQLError("Incident not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                incident.status = status;
                incident.modified_at = new Date();
                await incident.save();
                return incident;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        deleteIncident: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { id } = args;
                const incident = await Incident.findByPk(id);
                if (!incident) throw new GraphQLError("Incident not found", { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                await incident.destroy();
                return incident;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },

    Incident: {
        slot: async (parent) => await Slot.findByPk(parent.slot_id),
        user: async (parent) => await User.findByPk(parent.user_id),
    },
};

export default incidentResolvers;