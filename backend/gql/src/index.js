import { ApolloServer } from "apollo-server";

import enums from "./utils/enums.js";

//Station typeDefs and resolvers
import stationTypeDefs from "./models/stations/station.typeDefs.js";
import stationResolvers from "./models/stations/station.resolvers.js";

//Bike typeDefs and resolvers
import bikeTypeDefs from "./models/bikes/bike.typeDefs.js";
import bikeResolvers from "./models/bikes/bike.resolvers.js";

//Slot typeDefs and resolvers
import slotTypeDefs from "./models/slots/slot.typeDefs.js";
import slotResolvers from "./models/slots/slot.resolvers.js";

const server = new ApolloServer({
    typeDefs: [enums, stationTypeDefs, bikeTypeDefs, slotTypeDefs],
    resolvers: [stationResolvers, bikeResolvers, slotResolvers],
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});