import React, { useState } from "react";
import("../Dashboard.scss");
import { useStations } from "../../../hooks/useStations";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const StationsList = () => {
    const navigate = useNavigate();
    const { stations, useDeleteStationMultiple } = useStations();

    const columns = [
        {
            name: "Slug",
            selector: (row) => row.slug,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => row.image,
            sortable: true,
        },
        {
            name: "Position",
            selector: (row) => `lon: ${row.longitude} lat: ${row.latitude}`,
            sortable: true,
        },
    ];

    const conditionalRowStyles = [
        {
            when: (row) => row.status == "inactive",
            style: {
                backgroundColor: "red",
            },
        },
        {
            when: (row) => row.status == "maintenance",
            style: {
                backgroundColor: "yellow",
            },
        },
    ];

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const deleteStations = () => {
        useDeleteStationMultiple(selectedRows.map((row) => row.slug));
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
    };

    const redirects = {
        create: () => navigate("/dashboard/stations/create"),
        update: (slug) => navigate("/dashboard/stations/update/" + slug),
    };

    return (
        <div>
            <h1>Stations List</h1>
            <button
                className="custom-btn btn-3"
                onClick={() => redirects.create()}
            >
                <span>CREATE</span>
            </button>
            <button
                className="custom-btn btn-13"
                onClick={() => redirects.update(selectedRows[0].slug)}
                disabled={selectedRows.length !== 1}
            >
                <span>UPDATE</span>
            </button>
            <button
                className="custom-btn btn-5"
                onClick={() => deleteStations()}
                disabled={selectedRows.length === 0}
            >
                <span>DELETE</span>
            </button>
            <DataTable
                columns={columns}
                data={stations}
                pagination
                selectableRows
                onSelectedRowsChange={handleChange}
                conditionalRowStyles={conditionalRowStyles}
                clearSelectedRows={toggleCleared}
            />
        </div>
    );
};

export default StationsList;
