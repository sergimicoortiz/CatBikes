import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import User from "../user/user.model.js";
import Notification from "./notification.model.js";

const notificationResolvers = {
    Query: {
        notifications: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const seen = args.seen;
                if (seen === undefined) {
                    if (context.isAdmin) return await Notification.findAll();
                    return await Notification.findAll({
                        where: { user_id: context.user.id },
                    });
                } else {
                    if (context.isAdmin)
                        return await Notification.findAll({ where: { seen } });
                    return await Notification.findAll({
                        where: { user_id: context.user.id, seen },
                    });
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },

    Mutation: {
        createNotification: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { body, user_uuid } = args;
                const user = await User.findOne({ where: { uuid: user_uuid } });
                if (!user)
                    throw new GraphQLError("User not found", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });
                const notification = await Notification.create({
                    body,
                    user_id: user.id,
                });
                return notification;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        updateNotification: async (parent, args, context) => {
            try {
                if (!context.isAuth) throw context.AuthenticationError;
                const { id, seen } = args;
                const notification = await Notification.findByPk(id);
                if (!notification)
                    throw new GraphQLError("Notification not found", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });
                if (
                    !context.isAdmin &&
                    notification.user_id !== context.user.id
                )
                    throw context.AuthenticationError;
                notification.seen = seen;
                notification.modified_at = new Date();
                await notification.save();
                return notification;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },

    Notification: {
        user: async (parent) => await User.findByPk(parent.user_id),
    },
};

export default notificationResolvers;
