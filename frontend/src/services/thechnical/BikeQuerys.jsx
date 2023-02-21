import { gql } from "@apollo/client";

export const getBikesQuery = gql`
    query ($status: Status) {
        bikes(status: $status) {
            id
            slug
            name
            status
            Slot {
                id
                station {
                    slug
                }
            }
        }
    }
`;
