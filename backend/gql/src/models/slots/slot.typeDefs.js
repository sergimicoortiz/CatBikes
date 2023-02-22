import gql from "graphql-tag";

const slotTypeDefs = gql`
    type Slot {
        id: ID!
        status: Status!
        station: Station!
        bike: Bike
    }

    type Query {
        slots(status: Status): [Slot]!
        slot(id: ID!): Slot!
        slotQR(id: ID!): String!
    }

    type Mutation {
        createSlot(station_id: ID!): Slot
        deleteSlot(id: ID!): Slot
        setMaintenanceSlot(id: ID!, maintenance: Boolean!): Slot
    }
`;

export default slotTypeDefs;
