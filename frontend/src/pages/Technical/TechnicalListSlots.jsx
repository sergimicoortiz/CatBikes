import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSlotTechnical } from "../../hooks/technical/useSlotTechnical";
import DataTable from "react-data-table-component";
import "./Technical.scss";
const TechnicalListSlots = () => {
    const { slots, setStatus } = useSlotTechnical();
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },

        {
            name: "Station",
            selector: (row) => {
                if (row.station) {
                    return row.station.slug;
                }
                return "No station";
            },
            sortable: true,
        },
    ];

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const changeStatus = (new_status) => {
        setStatus(new_status);
        setToggleClearRows(!toggledClearRows);
        setSelectedRows([]);
    };

    const conditionalRowStyles = [
        {
            when: (row) => row.status == "used",
            style: {
                backgroundColor: "#03f65e",
            },
        },
        {
            when: (row) => row.status == "unused",
            style: {
                backgroundColor: "#497f7b",
            },
        },
        {
            when: (row) => row.status == "maintenance",
            style: {
                backgroundColor: "#7b7944",
            },
        },
    ];

    return (
        <div>
            <h1>Slots</h1>
            <button
                className="custom-btn btn-13"
                disabled={selectedRows.length !== 1}
                onClick={() =>
                    navigate("/technical/slots/" + selectedRows[0].id)
                }
            >
                <span>DETAILS</span>
            </button>
            <button
                className="custom-btn btn-3"
                onClick={() => changeStatus(null)}
            >
                <span>All</span>
            </button>
            <button
                className="custom-btn btn-3"
                onClick={() => changeStatus("used")}
            >
                <span>Used</span>
            </button>
            <button
                className="custom-btn btn-3"
                onClick={() => changeStatus("unused")}
            >
                <span>Unused</span>
            </button>
            <button
                className="custom-btn btn-3"
                onClick={() => changeStatus("maintenance")}
            >
                <span>Maintenance</span>
            </button>

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

export default TechnicalListSlots;
