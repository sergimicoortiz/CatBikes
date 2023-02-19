import React from "react";

export default function SlotsDropdown({ bikes, saveBike }) {

    bikes = bikes.filter(item => item.status == "used");

    const loopBikes = bikes.map(item =>
        <option value={item.slug} key={item.id}> {item.slug} </option>
    );

    const getValue = (data) => {
        saveBike({ "bike": data.target.value });
    };

    return (
        <select name="" id="" onChange={getValue}><option value={0} hidden>Select</option>{loopBikes}</select>
    );
}