import gql from "graphql-tag";

const rentTypeDefs = gql`
    type Rent {
        id: ID!
        bike: Bike!
        start_slot: Slot!
        end_slot: Slot
        start_date: String!
        end_date: String
        user: User!
    }

    type Query {
        rents: [Rent!]!
    }

    type Mutation {
        startRent(start_slot_id: ID!): Rent!
        endRent(end_slot_id: ID!): Rent!
        deleteRent(id: ID!): Rent!
    }
`;

export default rentTypeDefs;
