import React, {useState} from 'react';
import carService from "../services/carService";
import ModalOverlay from "./ModalOverlay.Component";
import "../css/modal.css"
import FormValidation from '../services/FormValidation';
import { useQueryClient } from '@tanstack/react-query';
import { cacheNames } from '../config/cache';

function DeleteModal({ modalActive, setModalActive, car }) {

    const [activeOverlay, setActiveOverlay] = useState(true);
    const [deletedCar, setDeletedCar] = useState(false);
    const [mistakes, setMistakes] = useState(false);
    const [inputData, setInputData] = useState({
        "reasonForDelete": ""
    });
    const queryClient = useQueryClient();

    const closeModal = ()=>{
        setModalActive(false);
    }

    function handleDeleteCar(event){
        event.target.disabled = true;
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length > 0){
            setMistakes(mistakes);    
            return;
        }
        carService.deleteCar({"car_id": car.id, "reason_for_delete": inputData.reasonForDelete})
            .then(data => {
                queryClient.invalidateQueries(cacheNames.allCars)
                setDeletedCar(data);
            })
            .catch(error =>{
                setMistakes(error);
            })
    }

    return (
        <>
        {activeOverlay && <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={closeModal} />}
        <div className={`edit-delete-modal position-absolute top-50 start-50 ${modalActive === false ? "d-none" : ""} `}>
            {deletedCar && <div className="alert alert-success" role="alert">{deletedCar.message}</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
            <div className="card">
                <div className="card-header">
                    License: {car.license}
                </div>
                <div className="card-body">
                    <em>Car will be not deleted only the status will be changed to the deleted</em>
                    <div className='form-group mt-3'>
                        <label htmlFor="reasonForDelete">Enter the reason for the deleting the car</label>
                        <input className='form-control' type="text" name='reasonForDelete' onChange={(event)=>{
                            setInputData({"reasonForDelete": event.target.value})
                        }} />
                    </div>
                </div>
                <div className="card-footer">
                    <div onClick={() => closeModal()} className="btn btn-warning">Close modal</div>
                    <button
                        className="btn btn-danger float-end"
                        onClick={(event) => handleDeleteCar(event)}
                    >
                        Delete Car
                    </button>

                </div>
            </div>
        </div>
        </>
    );
}

export default DeleteModal;