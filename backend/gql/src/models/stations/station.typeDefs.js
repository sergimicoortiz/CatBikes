import gql from "graphql-tag";

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

        updateStation(
            slug: String!
            name: String
            status: StationStatus
            image: String
            latitude: Float
            longitude: Float
        ): Station
    }
`;

export default stationTypeDefs;
