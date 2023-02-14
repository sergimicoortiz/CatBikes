import { ApolloServer } from "apollo-server";
import stationTypeDefs from "./models/stations/station.typeDefs.js";
import stationResolvers from "./models/stations/station.resolvers.js";

const server = new ApolloServer({ typeDefs: stationTypeDefs, resolvers: stationResolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});