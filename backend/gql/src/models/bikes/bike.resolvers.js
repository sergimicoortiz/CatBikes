import Bike from "./bike.model.js";
import Slot from '../slots/slot.model.js';

const bikeResolvers = {
    Query: {
        bike: async (parent, args) => await Bike.findOne({ where: { slug: args.slug } }),
        bikes: async () => await Bike.findAll(),
        bikesStatus: async (parent, args) => await Bike.findAll({ where: { status: args.status } })
    },

    Bike: {
        Slot: async (parent) => await Slot.findOne({ where: { bike_id: parent.id } })
    }
};

export default bikeResolvers;