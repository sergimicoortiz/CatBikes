import { ApolloServer } from "apollo-server";

//Station typeDefs and resolvers
import stationTypeDefs from "./models/stations/station.typeDefs.js";
import stationResolvers from "./models/stations/station.resolvers.js";

//Bike typeDefs and resolvers
import bikeTypeDefs from "./models/bikes/bike.typeDefs.js";
import bikeResolvers from "./models/bikes/bike.resolvers.js";

const server = new ApolloServer({
    typeDefs: [stationTypeDefs, bikeTypeDefs],
    resolvers: [stationResolvers, bikeResolvers],
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});