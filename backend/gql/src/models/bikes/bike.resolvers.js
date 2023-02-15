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
                const { name, slot_id } = args;
                const slug = generateSlug(name);
                const status = 'used';
                const bike = await Bike.create({ name, slug, status });
                if (slot_id) {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    if (!slot) throw new Error('Slot not found');
                    if (slot.bike_id) throw new Error('Slot already used');
                    slot.bike_id = bike.id;
                    slot.status = 'used';
                    bike.status = 'unused';
                    await slot.save();
                    await bike.save();
                }
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
                    slot.status = 'unused';
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
                const { slug, name, slot_id } = args;
                if (!name && !slot_id) throw new Error('No data to update');
                const bike = await Bike.findOne({ where: { slug } });
                if (!bike) throw new Error('Bike not found');
                if (name) bike.name = name;
                if (slot_id) {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    const slot_old = await Slot.findOne({ where: { bike_id: bike.id } });
                    if (!slot) throw new Error('Slot not found');
                    if (!slot_old) throw new Error('Slot not found');
                    if (slot.bike_id) throw new Error('Slot already used');
                    slot.bike_id = bike.id;
                    slot.status = 'used';
                    slot_old.bike_id = null;
                    slot_old.status = 'unused';
                    await slot_old.save();
                    await slot.save();
                }
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