import Bike from "./bike.model.js";
import { GraphQLError } from 'graphql';
import Slot from '../slots/slot.model.js';

const bikeResolvers = {
    Query: {
        bike: async (parent, args) => await Bike.findOne({ where: { slug: args.slug } }),
        bikes: async () => await Bike.findAll(),
        bikesStatus: async (parent, args) => {
            const status = args.status.toLowerCase();
            const status_list = ["used", "unused", "maintenance"];
            if (!status_list.includes(status)) {
                throw new GraphQLError('Invalid status', {
                    extensions: { code: "INVALID_STATUS" },
                });
            }
            return await Bike.findAll({ where: { status: args.status } })
        }
    },

    Bike: {
        Slot: async (parent) => await Slot.findOne({ where: { bike_id: parent.id } })
    }
};

export default bikeResolvers;