import { gql } from "apollo-server";

const enums = gql`
    enum Status {
        used
        unused
        maintenance
    }

    enum IncidentStatus {
        to_do
        in_progress
        in_revision
        resolved
    }

    enum StationStatus {
        active
        inactive
        maintenance
    }

    enum UserType {
        admin
        client
    }
`;

export default enums;