import { useContext, useCallback, useState } from 'react'
import SlotService from '../services/SlotService';
import { useBikes } from './useBikes';
import SlotsContext from '../context/SlotsContext';
import StationContext from '../context/StationsContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

export function useSlots() {
    const { slots, setSlots } = useContext(SlotsContext);
    const { stations, setStations } = useContext(StationContext);
    const [oneSlot, setOneSlot] = useState({});
    const [saveSlot, setSaveSlot] = useState({});
    const { bikes, setBikes } = useBikes();
    const navigate = useNavigate();

    const getOneSlot = useCallback((id) => {
        SlotService.getOne(id).
            then(({ data }) => {
                setOneSlot(data)
            })
            .catch(e => console.error(e));
    }, []);

    const useSlotManteinance = useCallback((id, put_in_manteinance) => {
        const status = put_in_manteinance ? 'manteinance' : 'unused';
        SlotService.updateStatus(id, status)
            .then(({ data, status }) => {
                if (status === 200) {
                    const old_slots = [...slots]
                    const index = old_slots.findIndex(item => item.id === data.id);
                    old_slots[index] = data;
                    setSlots(old_slots);
                    navigate('/dashboard/slots');
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('useSlotManteinance error');
                navigate('/home');
            });
    });

    const returnBike = (slug, id) => {
        SlotService.returnBikeBackend(slug, id)
            .then(data => {
                if (data.status == 200) {
                    let get_Old_Slots = [...slots];
                    const remove_old = get_Old_Slots.findIndex(item => item.id === Number(id));

                    //station
                    let new_station = stations.filter(item => item.id == get_Old_Slots[remove_old].station_id)[0];
                    new_station.total_bikes++;
                    setStations([
                        ...stations.filter(item => item.id != get_Old_Slots[remove_old].station_id),
                        new_station
                    ]);

                    let save_old = get_Old_Slots[remove_old];
                    save_old.bike_id = data.data.id;
                    save_old.status = 'used';
                    if (remove_old !== -1) {
                        get_Old_Slots[remove_old] = save_old;
                        setSlots(get_Old_Slots);

                        // Render bike
                        let get_Old_Bikes = [...bikes];
                        const remove_old_bike = get_Old_Bikes.findIndex(item => item.slug === slug);
                        let save_old_bike = get_Old_Bikes[remove_old_bike];
                        save_old_bike.status = 'unused';
                        if (remove_old_bike !== -1) {
                            get_Old_Bikes[remove_old_bike] = save_old_bike;
                            setBikes(get_Old_Bikes);
                        }

                    }
                    navigate('/dashboard/slots')
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('returnBike error');
                navigate('/home');
            });

    }

    const saveBike = (slug) => {
        if (slug) {
            setSaveSlot(slug)
        }
    }

    const rentBikeBackend = (id) => {
        SlotService.rentBikeBackend(id)
            .then(data => {
                if (data.status == 200) {
                    let get_Old_Slots = [...slots];
                    const remove_old = get_Old_Slots.findIndex(item => item.id === Number(id));
                    if (remove_old !== -1) {
                        // Render bike
                        let get_Old_Bikes = [...bikes];
                        const remove_old_bike = get_Old_Bikes.findIndex(item => item.id === get_Old_Slots[remove_old].bike_id);

                        // Slot
                        get_Old_Slots[remove_old] = data.data;
                        setSlots(get_Old_Slots);

                        // Continue Render bike
                        let save_old_bike = get_Old_Bikes[remove_old_bike];
                        save_old_bike.status = 'used';
                        if (remove_old_bike !== -1) {
                            get_Old_Bikes[remove_old_bike] = save_old_bike;
                            setBikes(get_Old_Bikes);
                        }

                        //station
                        let new_station = stations.filter(item => item.id == get_Old_Slots[remove_old].station_id)[0];
                        new_station.total_bikes--;
                        setStations([
                            ...stations.filter(item => item.id != get_Old_Slots[remove_old].station_id),
                            new_station
                        ]);

                    }
                    navigate('/dashboard/slots')
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('rentBikeBackend error');
                navigate('/home');
            });
    }


    return {
        slots,
        setSlots,
        getOneSlot,
        oneSlot,
        setOneSlot,
        returnBike,
        saveBike,
        saveSlot,
        setSaveSlot,
        rentBikeBackend,
        useSlotManteinance
    }
}