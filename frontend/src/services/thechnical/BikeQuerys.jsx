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

export const getOneBikesQuery = gql`
    query ($slug: String!) {
        bike(slug: $slug) {
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

export const maintenanceBikesQuery = gql`
    mutation ($slug: String!, $slotId: ID) {
        maintenanceBike(slug: $slug, slot_id: $slotId) {
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
