import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useIncidents } from "../../hooks/useIncidents";
import "./IncidentModal.scss";
Modal.setAppElement("#root");

const IncidentModal = ({ modalOpen, setModalOpen, slot_id }) => {

    const { useCreateIncident } = useIncidents();

    const validators = Yup.object().shape({
        title: Yup.string().required("Title is required").min(3).max(50),
        body: Yup.string().required("Body is required").min(3).max(300),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validators)
    });

    const customStyles = {
        overlay: {
            zIndex: "999",
        }
    };

    const onSubmit = data => {
        data.slot_id = slot_id;
        useCreateIncident(data);
    };

    const handleClose = () => {
        setModalOpen(false);
        setValue("title", "");
        setValue("body", "");
    };

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => handleClose()}
                className="incidentModal"
                style={customStyles}
            >
                <h1>Slot: {slot_id}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Title: </label>
                    <input
                        name="title"
                        type="text"
                        {...register("title")} />
                    <div className="error">{errors.title?.message}</div>
                    <label>Body: </label>
                    <textarea
                        name="body"
                        {...register("body")} />
                    <div className="error">{errors.body?.message}</div>
                    <button type="submit">Send</button>
                </form>
            </Modal>
        </div>
    );
};

export default IncidentModal;