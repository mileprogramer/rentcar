import React, {useState} from 'react';
import "../css/modal-overlay.css";

function ModalOverlay(props) {

    const isActive = props.isOverlayActive;
    const setIsActive = props.setActiveOverlay;

    const closeModal = (event) =>{
        setIsActive(false);
    }

    return (
        <div
            id="overlay"
            onClick={closeModal}
        >
        </div>
    );
}

export default ModalOverlay;