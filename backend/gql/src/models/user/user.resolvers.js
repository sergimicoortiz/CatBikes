import User from "./user.model.js";

const userResolvers = {
    Query: {
        user: async (parent, args, context) => {
            try {
                if (args.uuid) {
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

        allUsers: async () => await User.findAll()
    }
};

export default userResolvers;