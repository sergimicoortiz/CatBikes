import { gql } from "@apollo/client";

export const getOneSlotQuery = gql`
    query ($slotId: ID!) {
        slot(id: $slotId) {
            id
            status
            station {
                slug
            }
        }
    }
`;

export const getSlotsQuery = gql`
    query ($status: Status) {
        slots(status: $status) {
            id
            status
            station {
                slug
            }
        }
    }
`;
