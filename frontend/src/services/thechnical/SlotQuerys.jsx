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

export const maintenanceSlotQuery = gql`
    mutation ($setMaintenanceSlotId: ID!, $maintenance: Boolean!) {
        setMaintenanceSlot(
            id: $setMaintenanceSlotId
            maintenance: $maintenance
        ) {
            id
            status
            station {
                slug
            }
        }
    }
`;

export const slotQrQuery = gql`
    query ($slotQrId: ID!) {
        slotQR(id: $slotQrId)
    }
`;
