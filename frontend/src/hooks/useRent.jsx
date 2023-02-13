import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import RentService from "../services/RentService";
import { useSlots } from "./useSlots";

export function useRent() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [rents, setRents] = useState([]);
    const { slots, setSlots } = useSlots();
    const [oneRent, setOneRent] = useState();

    useEffect(() => {
        const path = pathname.split('/')[1];
        if (path === 'dashboard') {
            RentService.GetRentDashboard()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setRents(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useDeleteRentMultiple = async (ids) => {
        let ids_ok = [];
        for (let i = 0; i < ids.length; i++) {
            try {
                await RentService.DeleteRentDashboard(ids[i]);
                ids_ok.push(ids[i]);
                toast.success(`Rent ${ids[i]} deleted`);
            } catch (error) {
                toast.error(`Rent ${slugs[i]}`);
                console.error(error);
            }
        }
        setRents(rents.filter(item => !ids_ok.includes(item.id)));
    }
    
    const rentBike = (data) => {
        RentService.rentBike(data)
            .then((dataThen) => {
                if (dataThen.status == 200) {
                    toast.success("You rent a Bike, thanks you")
                    setTimeout(() => {
                        navigate("/home")
                        window.location.reload()
                    }, 1000);
                }
            })
            .catch(() => {
                toast.warning("You can't rent more than 1 bike")
            });
    }

    const returnBike = (data) => {
        RentService.getOneRent()
            .then((dataThen) => {
                if (dataThen.status == 200) {
                    data.bike_id = dataThen.data.bike
                    RentService.returnBike(data)
                        .then((dataReturn) => {
                            if (dataReturn.status == 200) {
                                toast.success("You return a Bike, thanks you")
                                setTimeout(() => {
                                    navigate("/home")
                                    window.location.reload()
                                }, 1000);
                            }
                        })
                }
            })
            .catch(() => {
                toast.warning("You don't have any bike")
            });
    }

    return {
        rents,
        setRents,
        useDeleteRentMultiple,
        rentBike, 
        returnBike
    }
}