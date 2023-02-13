import { useCallback, useContext, useState, useEffect } from "react"
import StationService from '../services/StationService';
import { useNavigate, useLocation } from "react-router-dom";
import StationContext from "../context/StationsContext";
import SlotService from "../services/SlotService";
import { toast } from "react-toastify";
import { useSlots } from './useSlots';

export function useStations() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { stations, setStations } = useContext(StationContext);
    const [oneStation, setOneStation] = useState({});
    const [slotStation, setSlotStation] = useState([]);
    const { slots, setSlots } = useSlots();

    //save the slots of an specific station.
    useEffect(() => {
        const page = pathname.split('/')[1];
        if (oneStation.id && page !== 'dashboard') {
            const params = { 'station_id': oneStation.id };
            SlotService.getAll(params)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setSlotStation(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, [oneStation]);


    const useOneStation = useCallback((slug) => {
        const station_tmp = stations.filter(item => item.slug === slug);
        if (station_tmp.length === 1) {
            setOneStation(station_tmp[0]);
        } else {
            StationService.GetStation(slug).
                then(({ data, status }) => {
                    if (status === 200) {
                        setOneStation(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useDeleteStationMultiple = async (slugs) => {
        let slugs_ok = [];
        for (let i = 0; i < slugs.length; i++) {
            try {
                await StationService.DeleteStation(slugs[i]);
                slugs_ok.push(slugs[i]);
                toast.success(`Station ${slugs[i]} deleted`);
            } catch (error) {
                toast.error(`Station ${slugs[i]} deleted`);
                console.error(error);
            }
        }
        setStations(stations.filter(item => !slugs_ok.includes(item.slug)));
        const ids_ok = stations.filter(item => !slugs_ok.includes(item.slug)).map(item => item.id);
        setSlots(slots.filter(slot => ids_ok.includes(slot.station_id)));
    }

    const useCreateStation = useCallback(data => {
        const slot_quantity = data.slot_quantity;
        delete (data.slot_quantity);
        StationService.CreateStations(data, slot_quantity)
            .then(({ data, status }) => {
                if (status === 200) {
                    toast.success('Station created');
                    navigate('/dashboard/stations');
                    data.station.total_slots = data.slots.length;
                    setStations([...stations, data.station]);
                    setSlots([...slots, ...data.slots]);
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('Create station error');
                navigate('/home');
            });
    }, []);

    const useUpdateStation = useCallback((slug, data) => {
        StationService.UpdateStation(slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    let old_stations = [...stations];
                    const index = old_stations.findIndex(item => item.slug === slug);
                    if (index !== -1) {
                        old_stations[index] = data;
                        setStations(old_stations);
                    }
                    toast.success(`Station ${slug} updated`);
                    navigate('/dashboard/stations');
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('Update station error');
                navigate('/home');
            });
    }, []);

    return { slotStation, setSlotStation, stations, setStations, oneStation, setOneStation, useCreateStation, useUpdateStation, useOneStation, useDeleteStationMultiple };
}