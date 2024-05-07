import React, {useState} from 'react';
import carService from "../services/carService";

import "../css/modal.css"
function DeleteModal({modalActive, setModalActive, setCars, car}) {

    const [deletedCar, setDeletedCar] = useState(false);
    const [mistakes, setMistakes] = useState(false);

    const closeModal = ()=>{
        setModalActive(false);
    }

    const deleteCar = async (event)=>{
        try{
            let result = await carService.deleteCar(null, car.license);
            if(result){
                setCars(await carService.getCars());
                setDeletedCar(true);
                setTimeout(() =>{
                    setModalActive(false);
                    setDeletedCar(false)
                }, 3000);
            }
        }catch (error){
            setMistakes(["Some mistake happend"]);
        }
    }

    return (
        <div className={`edit-delete-modal position-absolute top-50 start-50 ${modalActive === false ? "d-none" : ""} `}>
            {deletedCar && <div className="alert alert-success" role="alert">You successfully deleted a car</div>}
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
                    Do you want to delete the car with the License: {car.license}
                </div>
                <div className="card-footer">
                    <div onClick={() => closeModal()} className="btn btn-warning">Close modal</div>
                    <button
                        className="btn btn-danger float-end"
                        onClick={(event) => deleteCar(event)} // onClick handler directly within the button element
                        name={car.license}
                    >
                        Delete Car
                    </button>

                </div>
            </div>
        </div>
    );
}

export default DeleteModal;