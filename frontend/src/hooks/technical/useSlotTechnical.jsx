import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getOneSlotQuery,
    getSlotsQuery,
    maintenanceSlotQuery,
    slotQrQuery,
} from "../../services/thechnical/SlotQuerys";

export function useSlotTechnical() {
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState({});
    const [status, setStatus] = useState(null);
    const [slotId, setSlotId] = useState(0);
    const [qr, setQr] = useState("");
    const navigate = useNavigate();

    const {
        loading: loadingOne,
        data: dataOne,
        error: errorOne,
    } = useQuery(getOneSlotQuery, {
        variables: { slotId },
        fetchPolicy: "no-cache",
    });

    const {
        loading: loadingAll,
        data: dataAll,
        error: errorAll,
    } = useQuery(getSlotsQuery, {
        variables: { status },
        fetchPolicy: "no-cache",
    });

    const {
        loading: loadingQr,
        data: dataQr,
        error: errorQr,
    } = useQuery(slotQrQuery, {
        variables: { slotQrId: slotId },
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        console.log("dataAll", errorAll);
        if (dataAll) {
            setSlots(dataAll.slots);
        }
    }, [loadingAll, status]);

    useEffect(() => {
        console.log("dataQr", errorQr);
        if (dataQr) {
            setQr(dataQr);
        }
    }, [loadingQr, slotId]);

    useEffect(() => {
        console.log("dataOne", errorOne);
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
        qr,
        setQr,
    };
}
