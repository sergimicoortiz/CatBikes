import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getOneSlotQuery,
    getSlotsQuery,
    maintenanceSlotQuery,
} from "../../services/thechnical/SlotQuerys";

export function useSlotTechnical() {
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState({});
    const [status, setStatus] = useState(null);
    const [slotId, setSlotId] = useState(0);
    const navigate = useNavigate();

    const { loading: loadingOne, data: dataOne } = useQuery(getOneSlotQuery, {
        variables: { slotId },
        fetchPolicy: "no-cache",
    });

    const { loading: loadingAll, data: dataAll } = useQuery(getSlotsQuery, {
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

    const [maintenanceSlot] = useMutation(maintenanceSlotQuery);

    const useMaintenanceSlot = useCallback(async (slotId, maintenance) => {
        try {
            const { data } = await maintenanceSlot({
                variables: { setMaintenanceSlotId: slotId, maintenance },
            });
            if (data.setMaintenanceSlot.status === "maintenance") {
                toast.success(
                    `Slot ${data.setMaintenanceSlot.id} in maintenance`
                );
            } else {
                toast.success(`Slot ${data.setMaintenanceSlot.id} in service`);
            }
            navigate("/technical/slots");
        } catch (error) {
            console.error(error);
        }
    }, []);
    return {
        slot,
        setSlot,
        slots,
        setSlots,
        slotId,
        setSlotId,
        status,
        setStatus,
        useMaintenanceSlot,
    };
}
