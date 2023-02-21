import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBikesQuery } from "../../services/thechnical/BikeQuerys";

export function useBikesTechnical() {
    const [bikes, setBikes] = useState([]);
    const [status, setStatus] = useState(null);

    const { loading, error, data } = useQuery(getBikesQuery, {
        variables: { status },
    });

    useEffect(() => {
        if (data) {
            setBikes(data.bikes);
        } else {
            console.error(error);
        }
    }, [loading, status]);

    return {
        bikes,
        setBikes,
        status,
        setStatus,
        loading,
    };
}
