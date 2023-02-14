import { gql } from 'apollo-server';

const stationTypeDefs = gql`
    type Station {
        id: ID!
        name: String!
        slug: String!
        status: String!
        image: String!
        latitude: Float!
        longitude: Float!
    }

    type Query {
        station(slug: String!): Station
        stations: [Station]!
        stationCount: Int!
    }
    `;

export default stationTypeDefs;