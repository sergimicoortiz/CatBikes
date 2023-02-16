import gql from 'graphql-tag';

const userTypeDefs = gql`
    type User {
        uuid: String!
        email: String!
        types: UserType!
        username: String!
    }

    type Query {
        user(uuid: String): User
        allUsers: [User]!
    }
`;

export default userTypeDefs;