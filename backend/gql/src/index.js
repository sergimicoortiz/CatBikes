import { ApolloServer, AuthenticationError } from "apollo-server";

//Station typeDefs and resolvers
import stationTypeDefs from "./models/stations/station.typeDefs.js";
import stationResolvers from "./models/stations/station.resolvers.js";

//Bike typeDefs and resolvers
import bikeTypeDefs from "./models/bikes/bike.typeDefs.js";
import bikeResolvers from "./models/bikes/bike.resolvers.js";

//Slot typeDefs and resolvers
import slotTypeDefs from "./models/slots/slot.typeDefs.js";
import slotResolvers from "./models/slots/slot.resolvers.js";

//User typeDefs and resolvers
import userTypeDefs from "./models/user/user.typeDefs.js";
import userResolvers from "./models/user/user.resolvers.js";

//Other imports
import enums from "./utils/enums.js";
import { getUser } from './services/userService.js';

const server = new ApolloServer({
    typeDefs: [enums, stationTypeDefs, bikeTypeDefs, slotTypeDefs, userTypeDefs],
    resolvers: [stationResolvers, bikeResolvers, slotResolvers, userResolvers],
    context: async ({ req }) => {
        const token = (req.headers.authorization || '').split(' ')[1] || '';
        let user = null;
        let isAuth = false;
        let isAdmin = false;
        if (token) {
            const { data, status } = await getUser(token);
            if (status === 200) {
                user = data.user;
                isAuth = true;
                isAdmin = user.types === 'admin';
            }
        }
        return { user, isAdmin, isAuth, AuthenticationError };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});