import gql from "graphql-tag";

const notificationTypeDefs = gql`
    type Notification {
        id: ID!
        body: String!
        user: User!
        created_at: String!
        modified_at: String!
        seen: Boolean!
    }

    type Query {
        notifications(seen: Boolean): [Notification]!
    }

    type Mutation {
        createNotification(body: String!, user_uuid: String!): Notification!
        updateNotification(id: ID!, seen: Boolean!): Notification!
    }
`;

export default notificationTypeDefs;
