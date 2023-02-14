import { gql } from 'apollo-server';

const slotTypeDefs = gql`
    type Slot {
        id: ID!
        status: String!
        station: Station!
        bike: Bike
    }

    extend type Query {
        slots: [Slot]!
        slot(id: ID!): Slot!
    }
    `;

    export default slotTypeDefs;