import bike from "./bike.model.js";
import { GraphQLError } from 'graphql';


const bikeResolvers = {
    Query: {
        bike: async (parent, args) => await bike.findOne({ where: { slug: args.slug } }),
        bikes: async () => await bike.findAll(),
        bikesStatus: async (parent, args) => {
            const status = args.status.toLowerCase();
            const status_list = ["used", "unused", "maintenance"];
            if (!status_list.includes(status)) {
                throw new GraphQLError('Invalid status', {
                    extensions: { code: "INVALID_STATUS" },
                });
            }
            return await bike.findAll({ where: { status: args.status } })
        }
    }
};

export default bikeResolvers;