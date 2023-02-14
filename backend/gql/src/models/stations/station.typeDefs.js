import { gql } from 'apollo-server';

const stationTypeDefs = gql`
    type Station {
        id: ID!
        name: String!
        slug: String!
        status: StationStatus!
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

    type Mutation {
        addStation(
        name: String!
        status: StationStatus!
        image: String!
        latitude: Float!
        longitude: Float!
        slotCuantities: Int!
        ): Station

        deleteStation(slug: String!): Station
    }`;

export default stationTypeDefs;