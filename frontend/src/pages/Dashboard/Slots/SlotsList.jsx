import React from "react";
import { useSlots } from "../../../hooks/useSlots";

import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import "../Dashboard.scss";

const SlotsList = () => {
    const { slots } = useSlots();

    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const navigate = useNavigate();

    const columns = [
        {
            name: "id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "status",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "station_id",
            selector: row => row.station_id,
            sortable: true
        },
        {
            name: "bike_id",
            selector: row => row.bike_id,
            sortable: true
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.status == "used",
            style: {
                backgroundColor: "#03f65e",
            },
        },
        {
            when: row => row.status == "unused",
            style: {
                backgroundColor: "#497f7b",
            },
        },
        {
            when: row => row.status == "manteinance",
            style: {
                backgroundColor: "#7b7944",
            },
        },
    ];

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    return (
        <div>
            <button className="custom-btn btn-13" onClick={() => {
                navigate("/dashboard/slots/" + selectedRows[0].id);
            }} disabled={selectedRows.length != 1}>Details</button>
            <DataTable
                columns={columns}
                data={slots}
                pagination
                selectableRows
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
                conditionalRowStyles={conditionalRowStyles}

            />
        </div>
    );
};

export default SlotsList;