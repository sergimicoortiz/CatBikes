import React from "react";
import { useQuery } from "@apollo/client";
import { getBikes } from "../../services/gqlApi";

const Technical = () => {
    const { data } = useQuery(getBikes, {
        variables: { status: "used" },
    });

    return (
        <div>
            <h1>Technical</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
};

export default Technical;
