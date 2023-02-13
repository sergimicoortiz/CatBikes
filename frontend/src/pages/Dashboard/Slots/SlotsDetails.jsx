import React, { useEffect } from "react";
import { useSlots } from "../../../hooks/useSlots";
import { useBikes } from "../../../hooks/useBikes";
import { useParams } from "react-router-dom";
import SlotsDropdown from "../../../components/Dashboard/Slots/SlotDropdown";
import { toast } from 'react-toastify'
import '../Dashboard.scss'


const SlotsList = () => {
    const { id } = useParams();
    const { getOneSlot, oneSlot, returnBike, saveBike, saveSlot, rentBikeBackend, useSlotManteinance } = useSlots();
    const { bikes } = useBikes();

    useEffect(function () {
        getOneSlot(id);
    }, [])

    let buttons = null;
    const manteinance_btn =
        <button className="custom-btn btn-5 center" onClick={() => useSlotManteinance(id, true)}>Put in manteinance</button>

    switch (oneSlot.status) {
        case 'used':
            buttons = <div>
                <button className="custom-btn btn-13 center" onClick={() => {
                    rentBikeBackend(id)
                }}>Rent Bike</button>
            </div>
            break;

        case 'unused':
            buttons = <div>
                <SlotsDropdown bikes={bikes} key={bikes.slug} saveBike={saveBike}></SlotsDropdown>
                <button className="custom-btn btn-13 center" onClick={() => {
                    saveSlot.bike ? returnBike(saveSlot.bike, id) : toast.error("Select a bike")
                }}>Keep in Slot</button>
                {manteinance_btn}
            </div>
            break;
        case 'manteinance':
            buttons = <div>
                <button className="custom-btn btn-3 center" onClick={() => useSlotManteinance(id, false)}><span>The slot is operative</span></button>
            </div>
            break;

        default:
            break;
    }

    return (
        <div>
            <h1> You have selected the slot: {id} </h1>
            {buttons}
        </div>
    );
}

export default SlotsList;