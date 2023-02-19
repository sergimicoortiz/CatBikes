import React, { useState } from "react";
import { useRent } from "../../../hooks/useRent";
import("../Dashboard.scss");
import DataTable from "react-data-table-component";

const RentList = () => {
    const { rents, useDeleteRentMultiple } = useRent();
    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "user_id",
            selector: (row) => row.user_id,
            sortable: true,
        },
        {
            name: "bike_id",
            selector: (row) => row.bike_id,
            sortable: true,
        },
        {
            name: "start_slot_id",
            selector: (row) => row.start_slot_id,
            sortable: true,
        },
        {
            name: "end_slot_id",
            selector: (row) => row.end_slot_id,
            sortable: true,
        },
        {
            name: "start_date",
            selector: (row) => row.start_date,
            sortable: true,
        },
        {
            name: "end_date",
            selector: (row) => row.end_date,
            sortable: true,
        },
    ];

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const deleteRents = () => {
        useDeleteRentMultiple(
            selectedRows
                .filter((item) => item.end_slot_id !== null)
                .map((row) => row.id)
        );
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
    };

    const conditionalRowStyles = [
        {
            when: (row) => row.end_slot_id !== null,
            style: {
                backgroundColor: "green",
            },
        },
    ];

    return (
        <div>
            <h1>Rent List</h1>
            <h2>Only finished rents can be deleted</h2>
            <button
                className="custom-btn btn-5"
                onClick={() => deleteRents()}
                disabled={selectedRows.length === 0}
            >
                <span>DELETE</span>
            </button>
            <DataTable
                columns={columns}
                data={rents}
                pagination
                selectableRows
                onSelectedRowsChange={handleChange}
                conditionalRowStyles={conditionalRowStyles}
                clearSelectedRows={toggleCleared}
            />
        </div>
    );
};
export default RentList;
