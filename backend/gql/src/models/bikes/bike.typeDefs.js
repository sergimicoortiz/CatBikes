import { gql } from 'apollo-server';

const bikeTypeDefs = gql`
    type Bike {
        id: ID!
        name: String!
        slug: String!
        status: String!
        Slot: Slot
    }

    type Query {
        bike(slug: String!): Bike
        bikes: [Bike]!
        bikesStatus(status: String!): [Bike]!
    }
    `;

    export default bikeTypeDefs;