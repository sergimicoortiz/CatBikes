import React, { useEffect } from "react";
import propTypes from "prop-types";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './StationsForm.scss';
import MapDashboard from "../../MapStations/MapDashboard";

const StationForm = ({ SendData, station = {
    name: '', status: '', image: '', slug: '', longitude: 0, latitude: 0
} }) => {

    const validators = Yup.object().shape({
        name: Yup.string().required('Name is required').min(3).max(50),
        status: Yup.string().required('Status is required'),
        image: Yup.string().url().required('Image is required').min(3).max(100),
        slot_quantity: Yup.number().min(1),
        longitude: Yup.number().required(),
        latitude: Yup.number().required(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validators)
    });

    useEffect(() => {
        if (station.slug !== '') {
            setValue('name', station.name);
            setValue('status', station.status);
            setValue('image', station.image);
            setValue('longitude', station.longitude);
            setValue('latitude', station.latitude);
        }
    }, [station]);

    const slot_quantity_form = station.status == '' ?
        <div>

            <label>Slot quantity: </label>
            <input
                name="slot_quantity"
                min="0"
                type="number"
                {...register('slot_quantity')} />
            <div className="error">{errors.slot_quantity?.message}</div>
        </div>
        : '';


    const onSubmit = data => {
        SendData(data);
    };

    const buttonContent = station.slug !== '' ? 'Update' : 'Create';

    const handleChange = (data) => {
        setValue('longitude', data.longitude);
        setValue('latitude', data.latitude);
    }

    return (
        <div className="formStations">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name: </label>
                <input
                    name="name"
                    type="text"
                    {...register('name')} />
                <div className="error">{errors.name?.message}</div>

                <label>Status: </label>
                <select name="status" {...register('status')} defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="active">Active</option>
                    <option value="manteinance">Manteinance</option>
                    <option value="inactive">Inactive</option>
                </select>
                <div className="error">{errors.status?.message}</div>

                <label>Image: </label>
                <input
                    name="image"
                    type="text"
                    {...register('image')} />
                <div className="error">{errors.image?.message}</div>
                {slot_quantity_form}
                <MapDashboard latitude={station.latitude} longitude={station.longitude} handleChange={handleChange} />
                <div className="error">{errors.longitude?.message}</div>
                <div className="error">{errors.latitude?.message}</div>
                <button type="submit">{buttonContent}</button>
            </form>
        </div>
    )
}

StationForm.propTypes = {
    SendData: propTypes.func.isRequired,
    station: propTypes.object,
}

export default StationForm;