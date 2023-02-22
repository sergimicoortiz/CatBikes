import gql from "graphql-tag";

const bikeTypeDefs = gql`
    type Bike {
        id: ID!
        name: String!
        slug: String!
        status: Status!
        Slot: Slot
    }

    type Query {
        bike(slug: String!): Bike
        bikes(status: Status): [Bike]!
        bikeQR(slug: String!): String!
    }

    type Mutation {
        createBike(name: String!, slot_id: ID): Bike
        updateBike(
            slug: String!
            name: String
            slot_id: ID
            status: Status
        ): Bike
        deleteBike(slug: String!): Bike
        maintenanceBike(slug: String!, slot_id: ID): Bike
    }
`;

export default bikeTypeDefs;
