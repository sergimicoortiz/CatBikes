import gql from "graphql-tag";

const incidentTypeDefs = gql`
    type Incident {
        id: ID!
        body: String!
        title: String!
        slug: String!
        status: IncidentStatus!
        slot: Slot!
        user: User!
        created_at: String!
        modified_at: String!
    }

    type Query {
        incidents(status: IncidentStatus): [Incident]
    }

    type Mutation {
        createIncident(body: String!, title: String!, slot_id: ID!): Incident
        updateIncident(id: ID!, status: IncidentStatus!): Incident
        deleteIncident(id: ID!): Incident
    }
`;

export default incidentTypeDefs;
