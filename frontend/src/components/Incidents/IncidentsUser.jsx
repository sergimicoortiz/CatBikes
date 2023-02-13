import React, { useState } from "react";
import { useIncidents } from "../../hooks/useIncidents";
import DataTable from 'react-data-table-component';


const IncidentsUser = () => {
    const { userIncidents } = useIncidents();
    const columns = [
        {
            name: 'Slug',
            selector: row => row.slug,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,

        },
        {
            name: 'Slot',
            selector: row => row.slot_id,
            sortable: true,

        },
        {
            name: 'Body',
            selector: row => row.body,
            sortable: true,

        },
        {
            name: 'Created',
            selector: row => row.created_at,
            sortable: true,

        },
        {
            name: 'Modified',
            selector: row => row.modified_at,
            sortable: true,

        },
    ];


    const conditionalRowStyles = [
        {
            when: row => row.status == "in_progress",
            style: {
                backgroundColor: 'yellow',
            },
        },
        {
            when: row => row.status == "in_revision",
            style: {
                backgroundColor: 'orange',
            },
        },
        {
            when: row => row.status == "resolved",
            style: {
                backgroundColor: 'green',
            },
        },
    ];


    return (

        <div>
            <DataTable
                columns={columns}
                data={userIncidents}
                pagination
                conditionalRowStyles={conditionalRowStyles}

            />
        </div>
    )
}

export default IncidentsUser