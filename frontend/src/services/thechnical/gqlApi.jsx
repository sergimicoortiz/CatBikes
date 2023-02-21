import { ApolloClient, InMemoryCache } from "@apollo/client";
import secrets from "../../secrets";

export const gqlClient = new ApolloClient({
    uri: secrets.URL_GQL || "http://localhost:4000",
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem("token")
            ? ` Bearer ${localStorage.getItem("token")}`
            : "",
    },
});

// This is created at the app start so when we refresh token the auth header do not change.
