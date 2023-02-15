import { gql } from 'apollo-server';

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
        bikes: [Bike]!
        bikesStatus(status: Status!): [Bike]!
    }

    type Mutation {
        createBike(name: String!, status: Status!): Bike
        updateBike(slug: String!, name: String, status: Status): Bike
        deleteBike(slug: String!): Bike

    }`;

export default bikeTypeDefs;