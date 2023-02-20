import Bike from "./bike.model.js";
import Slot from "../slots/slot.model.js";
import { generateSlug } from "../../utils/utils.js";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";

const bikeResolvers = {
    Query: {
        bike: async (parent, args) =>
            await Bike.findOne({ where: { slug: args.slug } }),
        bikes: async (parent, args) => {
            const { status } = args;
            if (status) return await Bike.findAll({ where: { status } });
            return await Bike.findAll();
        },
    },

    Bike: {
        Slot: async (parent) =>
            await Slot.findOne({ where: { bike_id: parent.id } }),
    },

    Mutation: {
        createBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { name, slot_id } = args;
                const slug = generateSlug(name);
                const status = "used";
                const bike = await Bike.create({ name, slug, status });
                if (slot_id) {
                    const slot = await Slot.findOne({ where: { id: slot_id } });

                    // Check if slot exists
                    if (!slot)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });

                    // Check if slot is already used
                    if (slot.bike_id)
                        throw new GraphQLError("Slot already used", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });

                    //Update slot and bike
                    slot.bike_id = bike.id;
                    slot.status = "used";
                    bike.status = "unused";
                    await slot.save();
                    await bike.save();
                }
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        deleteBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const bike = await Bike.findOne({ where: { slug: args.slug } });

                // Check if bike exists
                if (!bike)
                    throw new GraphQLError("Bike not found", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                const slot = await Slot.findOne({
                    where: { bike_id: bike.id },
                });

                //If the bike is in a slot, update the slot
                if (slot) {
                    slot.bike_id = null;
                    slot.status = "unused";
                    await slot.save();
                }
                await bike.destroy();
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        updateBike: async (parent, args, context) => {
            try {
                if (!context.isAdmin) throw context.AuthenticationError;
                const { slug, name, slot_id, status } = args;

                // Check if there is data to update
                if (!name && !slot_id && !status)
                    throw new GraphQLError("No data to update", {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        },
                    });

                // Check if bike exists
                const bike = await Bike.findOne({ where: { slug } });
                if (!bike)
                    throw new GraphQLError("Bike not found", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });

                //Update name
                if (name) bike.name = name;

                //If the bike is in not unused and we have an slot, we put that bike in the slot
                if (slot_id && bike.status !== "unused") {
                    const slot = await Slot.findOne({ where: { id: slot_id } });

                    // Check if slot exists
                    if (!slot)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });

                    // Check if slot is already used
                    if (slot.bike_id)
                        throw new GraphQLError("Slot already used", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    slot.bike_id = bike.id;
                    slot.status = "used";
                    bike.status = "unused";
                    await slot.save();

                    //If the bike is unused(already in a slot) and we provide a new slot we change the bike from a slot to another
                } else if (slot_id && bike.status === "unused") {
                    const slot = await Slot.findOne({ where: { id: slot_id } });

                    // Check if new slot exists and is not used
                    if (!slot)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    if (slot.bike_id)
                        throw new GraphQLError("Slot already used", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    const slot_old = await Slot.findOne({
                        where: { bike_id: bike.id },
                    });

                    // Check if old slot exists
                    if (!slot_old)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });

                    //Update old slots
                    slot_old.bike_id = null;
                    slot_old.status = "unused";
                    await slot_old.save();

                    //Update new slot
                    slot.bike_id = bike.id;
                    slot.status = "used";
                    bike.status = "unused";
                    await slot.save();

                    //If we want to put the bike in use and the bike is in a slot we remove the bike from the slot
                } else if (status === "used" && bike.status === "unused") {
                    const slot_old = await Slot.findOne({
                        where: { bike_id: bike.id },
                    });

                    if (!slot_old)
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    slot_old.bike_id = null;
                    slot_old.status = "unused";
                    await slot_old.save();
                    bike.status = "used";

                    //If we want to put the bike in maintenance, we take the bike from the slot
                } else if (status === "maintenance") {
                    if (bike.status === "used")
                        throw new GraphQLError("Bike is in use", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    const slot_old = await Slot.findOne({
                        where: { bike_id: bike.id },
                    });
                    if (!slot_old) {
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    }
                    slot_old.bike_id = null;
                    slot_old.status = "unused";
                    await slot_old.save();
                    bike.status = "maintenance";
                }

                await bike.save();
                return bike;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        maintenanceBike: async (parent, args, context) => {
            try {
                if (!context.isTechnical) throw context.AuthenticationError;
                const { slug, slot_id } = args;
                const bike = await Bike.findOne({ where: { slug } });
                if (!bike) {
                    throw new GraphQLError("Slot not found", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                }
                //If the bike is in maintenance and we don't have an slot. error
                if (bike.status === "maintenance" && slot_id === undefined) {
                    throw new GraphQLError("Bike is in maintenance", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                }

                //If the bike is in maintenance and we have an slot we put the bike in the slot
                if (bike.status === "maintenance" && slot_id !== undefined) {
                    const slot = await Slot.findOne({ where: { id: slot_id } });
                    if (!slot) {
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    }
                    if (slot.bike_id) {
                        throw new GraphQLError("Slot already used", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    }
                    bike.status = "unused";
                    slot.bike_id = bike.id;
                    slot.status = "used";
                    await slot.save();
                    await bike.save();
                    return bike;
                }
                //If the bike is in use. error
                if (bike.status === "used") {
                    throw new GraphQLError("Bike is in use", {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    });
                }
                //If the bike is unused and we don't have an slot, we put the bike in maintenance
                if (bike.status === "unused" && slot_id === undefined) {
                    bike.status = "maintenance";
                    const slot_old = await Slot.findOne({
                        where: { bike_id: bike.id },
                    });
                    if (!slot_old) {
                        throw new GraphQLError("Slot not found", {
                            extensions: {
                                code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                            },
                        });
                    }
                    slot_old.bike_id = null;
                    slot_old.status = "unused";
                    await slot_old.save();
                    await bike.save();
                    return bike;
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },
};

export default bikeResolvers;
