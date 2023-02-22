import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import secrets from "../../secrets";

const link = createHttpLink({
    uri: secrets.URL_GQL || "http://localhost:4000",
    credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token")
                ? ` Bearer ${localStorage.getItem("token")}`
                : "",
        },
    };
});

export const gqlClient = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
});
