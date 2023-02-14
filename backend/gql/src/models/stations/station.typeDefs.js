import { gql } from 'apollo-server';

const stationTypeDefs = gql`
    type Station {
        id: ID!
        name: String!
        slug: String!
        status: Status!
        image: String!
        latitude: Float!
        longitude: Float!
        total_slots: Int!
        total_bikes: Int!
        slots: [Slot]!
    }

    type Query {
        station(slug: String!): Station
        stations: [Station]!
        stationCount: Int!
    }
    `;

export default stationTypeDefs;