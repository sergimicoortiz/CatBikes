import User from "./user.model.js";

const userResolvers = {
    Query: {
        user: async (parent, args, context) => {
            try {
                if (args.uuid) {
                    if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
                    const user = await User.findOne({ where: { uuid: args.uuid } });
                    if (!user) throw new Error('User not found');
                    return user;
                }
                if (!context.user) throw new Error('User not found');
                return context.user;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        allUsers: async (parent, args, context) => {
            if (!context.isAdmin) throw new context.AuthenticationError('Unauthorized');
            return await User.findAll()
        }
    }
};

export default userResolvers;