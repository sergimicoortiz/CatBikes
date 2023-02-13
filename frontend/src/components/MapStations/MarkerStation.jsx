import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const MarkerStation = ({ station = {
    'slug': '',
    'name': '',
    'status': '',
    'image': '',
    'longitude': 0,
    'latitude': 0,
    'total_slots': 0,
    'total_bikes': 0,

} }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            zIndex: '999',
        }
    };

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Marker longitude={station.longitude} latitude={station.latitude} anchor="top" onClick={() => setModalOpen(true)} />
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}>
                <img src={station.image} className='markerImg' />
                <p>Name: {station.name}</p>
                <p>Slots: {station.total_slots}</p>
                <p>Bikes: {station.total_bikes}</p>
                <button onClick={() => setModalOpen(false)} className='btn btn-5'><span>CLOSE</span></button><br />
                <button onClick={() => navigate('/stations/' + station.slug)} className='btn btn-3'><span>DETAILS</span></button>
            </Modal>
        </div>
    )
}

export default MarkerStation