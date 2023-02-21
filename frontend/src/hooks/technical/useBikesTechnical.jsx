import { useCallback, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getBikesQuery,
    getOneBikesQuery,
    maintenanceBikesQuery,
} from "../../services/thechnical/BikeQuerys";

export function useBikesTechnical() {
    const [bikes, setBikes] = useState([]);
    const [bike, setBike] = useState({});
    const [status, setStatus] = useState(null);
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    const { loading: loadingAll, data: dataAll } = useQuery(getBikesQuery, {
        variables: { status },
        fetchPolicy: "no-cache",
        // With this option the query don't use the cache. This is for the mutation, because if we dont use this we would have to make the changes manualy.
    });

    const { loading: loadingOne, data: dataOne } = useQuery(getOneBikesQuery, {
        variables: { slug },
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        if (dataAll) {
            setBikes(dataAll.bikes);
        }
    }, [loadingAll, status]);

    useEffect(() => {
        if (dataOne) {
            setBike(dataOne.bike);
        }
    }, [loadingOne, slug]);

    const [MaintenanceBikeMutation] = useMutation(maintenanceBikesQuery);

    const useMaintenanceBike = useCallback(async (slug) => {
        try {
            const { data } = await MaintenanceBikeMutation({
                variables: { slug },
            });
            if (data) {
                toast.success(
                    `Bike ${data.maintenanceBike.slug} in maintenance`
                );
                navigate("/technical/bikes");
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const useMaintenanceBikeRemove = useCallback(async (slug, slotId) => {
        try {
            const { data } = await MaintenanceBikeMutation({
                variables: { slug, slotId },
            });
            if (data) {
                toast.success(
                    `Bike ${data.maintenanceBike.slug} in slot ${data.maintenanceBike.Slot.id}`
                );
                navigate("/technical/bikes");
            }
        } catch (error) {
            console.error(error);
            toast.error("The slot is in use");
        }
    }, []);

    return {
        bikes,
        setBikes,
        status,
        setStatus,
        slug,
        setSlug,
        bike,
        setBike,
        useMaintenanceBike,
        useMaintenanceBikeRemove,
    };
}
