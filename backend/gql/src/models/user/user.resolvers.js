import User from "./user.model.js";
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const userResolvers = {
    Query: {
        user: async (parent, args, context) => {
            try {
                if (args.uuid) {
                    if (!context.isAdmin) throw context.AuthenticationError;
                    const user = await User.findOne({ where: { uuid: args.uuid } });
                    if (!user) throw new GraphQLError('User not found', { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } });
                    return user;
                }
                if (!context.user) throw context.AuthenticationError;
                return context.user;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        allUsers: async (parent, args, context) => {
            if (!context.isAdmin) throw context.AuthenticationError;
            return await User.findAll()
        }
    }
};

export default userResolvers;