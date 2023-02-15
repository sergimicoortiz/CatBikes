import Slot from "../slots/slot.model.js";
import Station from "../stations/station.model.js";
import Bike from "../bikes/bike.model.js";

const slotResolvers = {
    Query: {
        slots: async () => await Slot.findAll(),
        slot: async (parent, args) => await Slot.findByPk(args.id),
    },

    Slot: {
        station: async (parent) => await Station.findByPk(parent.station_id),
        bike: async (parent) => await Bike.findByPk(parent.bike_id),
    },

    Mutation: {
        createSlot: async (parent, args) => {
            try {
                const { station_id } = args;
                const status = "unused";
                const station = await Station.findByPk(station_id);
                if (!station) throw new Error("Station not found");
                const slot = await Slot.create({ status, station_id });
                return slot;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        updateSlot: async (parent, args) => {
            try {

            }
            catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        deleteSlot: async (parent, args) => {
            try {
                const slot = await Slot.findByPk(args.id);
                if (!slot) throw new Error("Slot not found");
                const bike = await Bike.findByPk(slot.bike_id);
                if(bike){
                    bike.status = "used";
                    await bike.save();
                }
                await Slot.destroy({ where: { id: args.id } });
                return slot;
            }
            catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
    },
};

export default slotResolvers;