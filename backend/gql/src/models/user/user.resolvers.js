import User from "./user.model.js";
import { GraphQLError } from 'graphql';

const userResolvers = {
    Query: {
        user: async (parent, args, context) => {
            try {
                if (args.uuid) {
                    if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
                    const user = await User.findOne({ where: { uuid: args.uuid }  });
                    if (!user) throw new GraphQLError('User not found', { extensions: { code: 'USER_NOT_FOUND' } });
                    return user;
                }
                if (!context.user) throw new GraphQLError('User not found', { extensions: { code: 'USER_NOT_FOUND' } });
                return context.user;
            } catch (error) {
                console.error(error);
                throw new GraphQLError('User not found', { extensions: { code: 'USER_NOT_FOUND' } });
            }
        },

        allUsers: async (parent, args, context) => {
            if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
            return await User.findAll()
        }
    }
};

export default userResolvers;