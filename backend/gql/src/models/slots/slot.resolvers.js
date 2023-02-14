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
    }
};

export default slotResolvers;