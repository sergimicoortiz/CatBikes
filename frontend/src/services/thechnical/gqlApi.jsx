import { ApolloClient, InMemoryCache } from "@apollo/client";
import secrets from "../../secrets";

export const gqlClient = new ApolloClient({
    uri: secrets.URL_GQL || "http://localhost:4000",
    cache: new InMemoryCache(),
});
