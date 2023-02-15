import { gql } from 'apollo-server';

const slotTypeDefs = gql`
    type Slot {
        id: ID!
        status: Status!
        station: Station!
        bike: Bike
    }

     type Query {
        slots: [Slot]!
        slot(id: ID!): Slot!
    }

    type Mutation {
        createSlot(station_id: ID!): Slot
        deleteSlot(id: ID!): Slot
    }`;

export default slotTypeDefs;