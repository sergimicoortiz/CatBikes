import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
    getOneSlotQuery,
    getAllSlotsQuery,
} from "../../services/thechnical/SlotQuerys";

export function useSlotTechnical() {
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState({});
    const [status, setStatus] = useState(null);
    const [slotId, setSlotId] = useState(0);

    const { loading: loadingOne, data: dataOne } = useQuery(getOneSlotQuery, {
        variables: { slotId },
        fetchPolicy: "no-cache",
    });

    const { loading: loadingAll, data: dataAll } = useQuery(getAllSlotsQuery, {
        variables: { status },
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        if (dataAll) {
            setSlots(dataAll.slots);
        }
    }, [loadingAll, status]);

    useEffect(() => {
        if (dataOne) {
            setSlot(dataOne.slot);
        }
    }, [loadingOne, slotId]);

    return {
        slot,
        setSlot,
        slots,
        setSlots,
        slotId,
        setSlotId,
        status,
        setStatus,
    };
}
