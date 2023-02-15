import Bike from "./bike.model.js";
import Slot from '../slots/slot.model.js';
import { generateSlug } from '../../utils/utils.js';


const bikeResolvers = {
    Query: {
        bike: async (parent, args) => await Bike.findOne({ where: { slug: args.slug } }),
        bikes: async () => await Bike.findAll(),
        bikesStatus: async (parent, args) => await Bike.findAll({ where: { status: args.status } })
    },

    Bike: {
        Slot: async (parent) => await Slot.findOne({ where: { bike_id: parent.id } })
    },

    Mutation: {
        createBike: async (parent, args) => {
            try {
                const { name, status } = args;
                const slug = generateSlug(name);
                const bike = await Bike.create({ name, slug, status });
                return bike;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        deleteBike: async (parent, args) => {
            try {
                const bike = await Bike.findOne({ where: { slug: args.slug } });
                const slot = await Slot.findOne({ where: { bike_id: bike.id } });
                if (slot) {
                    slot.bike_id = null;
                    await slot.save();
                }
                await bike.destroy();
                return bike;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        updateBike: async (parent, args) => {
            try {
                const { slug, name, status } = args;
                const bike = await Bike.findOne({ where: { slug } });
                if (!bike) throw new Error('Bike not found');
                if (name) bike.name = name;
                if (status) bike.status = status;
                await bike.save();
                return bike;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
};

export default bikeResolvers;