/* eslint-disable indent */
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

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

//Rent typeDefs and resolvers
import rentTypeDefs from "./models/rent/rent.typeDefs.js";
import rentResolvers from "./models/rent/rent.resolvers.js";

//Incident typeDefs and resolvers
import incidentTypeDefs from "./models/incident/incident.typeDefs.js";
import incidentResolvers from "./models/incident/incident.resolvers.js";

//Notification typeDefs and resolvers
import notificationTypeDefs from "./models/notification/notification.typeDefs.js";
import notificationResolvers from "./models/notification/notification.resolvers.js";

//Other imports
import enums from "./utils/enums.js";
import { getUser } from "./services/userService.js";

dotenv.config();

const context = async ({ req }) => {
    const AuthenticationError = new GraphQLError("Authentication failed", {
        context: { code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED },
    });
    const token = (req.headers.authorization || "").split(" ")[1] || "";
    let user = null;
    let isAuth = false;
    let isAdmin = false;
    let isTechnical = false;
    if (token) {
        const { data, status } = await getUser(token);
        if (status === 200) {
            user = data.user;
            isAuth = true;
            isAdmin = data.user.types === "admin";
            isTechnical = data.user.types === "technical";
        }
    }
    return { user, isAdmin, isAuth, isTechnical, AuthenticationError };
};

const app = express();
const httpServer = http.createServer(app);

const plugins =
    process.env.NODE_ENV === "development"
        ? [ApolloServerPluginDrainHttpServer({ httpServer })]
        : [
              ApolloServerPluginLandingPageDisabled(),
              ApolloServerPluginDrainHttpServer({ httpServer }),
          ];

const server = new ApolloServer({
    typeDefs: [
        enums,
        stationTypeDefs,
        bikeTypeDefs,
        slotTypeDefs,
        userTypeDefs,
        rentTypeDefs,
        incidentTypeDefs,
        notificationTypeDefs,
    ],
    resolvers: [
        stationResolvers,
        bikeResolvers,
        slotResolvers,
        userResolvers,
        rentResolvers,
        incidentResolvers,
        notificationResolvers,
    ],
    cache: "bounded",
    includeStacktraceInErrorResponses: process.env.NODE_ENV === "development",
    plugins: plugins,
});

await server.start();

app.use(
    "/",
    cors({
        origin: [process.env.CORS || "http://localhost:3000"],
    }),
    bodyParser.json(),
    expressMiddleware(server, { context })
);

await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
);

console.log("Server ready");
