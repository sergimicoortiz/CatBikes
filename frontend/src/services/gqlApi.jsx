import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import secrets from "../secrets";

export const gqlClient = new ApolloClient({
    uri: secrets.URL_GQL || "http://localhost:4000",
    cache: new InMemoryCache(),
});

export const getBikes = gql`
    query ($status: Status) {
        bikes(status: $status) {
            id
            slug
            name
            status
            Slot {
                id
                station {
                    slug
                }
            }
        }
    }
`;
