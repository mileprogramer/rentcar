import React, {useEffect, useState} from 'react';
import carService from "../services/carService";

import "../css/modal.css"
import FormValidation from "../services/FormValidation";
function EditModal({modalActive, setModalActive, setCars, car}) {

    const [editedCar, setEditedCar] = useState(false);
    const [mistakes, setMistakes] = useState(false);
    const [inputData, setInputData] = useState({
        id: car.id,
        license: car.license,
        newLicense: car.license,
        brand: car.brand,
        model: car.model,
        year: car.year,
        pricePerDay: car.pricePerDay,
        airConditioner: car.airConditioner
    });

    useEffect(() => {
        if (car) {
            setInputData({
                id: car.id,
                license: car.license,
                newLicense: car.license,
                brand: car.brand,
                model: car.model,
                year: car.year,
                pricePerDay: car.pricePerDay,
                airConditioner: car.airConditioner
            });
        }
    }, [car]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const closeModal = ()=>{
        setModalActive(false);
    }

    function isAirConditioner(airConditioner, typeInput){
        if(airConditioner === true && typeInput === "yes"){
            return true;
        }
        else if(airConditioner === false && typeInput === "no"){
            return true;
        }
    }

    const editCar = async (event)=>{
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
        }
        carService.updateCar(inputData)
            .then(data =>{
                setCars("edit", inputData, null);
                setEditedCar(data);
                setTimeout(()=>{
                    setEditedCar(false);
                },5000)
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    }

    return (
        <div className={`edit-modal position-absolute top-50 start-50 ${modalActive === false ? "d-none" : ""} `}>
            {editedCar && <div className="alert alert-success" role="alert">{editedCar.message}</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message}</div>
                    ))}
                </div>
            )}
            <div className="card">
                <div className="card-header">
                    Edit car with license: {car.license}
                </div>
                <div className="card-body">
                    <div className="form-group w-50 offset-3">
                        <label htmlFor="brand">Type license</label>
                        <input
                            id="newLicense"
                            name="newLicense"
                            type="text"
                            className="form-control"
                            value={inputData.newLicense}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group w-50 offset-3">
                        <label htmlFor="brand">Type brand</label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            className="form-control"
                            value={inputData.brand}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group w-50 offset-3">
                        <label htmlFor="brand">Type model</label>
                        <input
                            id="model"
                            name="model"
                            type="text"
                            className="form-control"
                            value={inputData.model}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group w-50 offset-3">
                        <label htmlFor="year">Type year</label>
                        <input
                            id="year"
                            name="year"
                            type="text"
                            className="form-control"
                            value={inputData.year}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group w-50 offset-3">
                        <label htmlFor="price">Price per day</label>
                        <input
                            id="pricePerDay"
                            name="pricePerDay"
                            type="number"
                            className="form-control"
                            value={inputData.pricePerDay}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group w-50 offset-3 d-flex gap-3 my-3">
                        <label htmlFor="airConditioner">Air conditioner</label>
                        <input
                            id="airConditionerYes"
                            name="airConditioner"
                            type="radio"
                            value="true"
                            defaultChecked={isAirConditioner(car.airConditioner, "yes")}
                            onChange={handleInput}
                        /> Yes
                        <input
                            id="airConditionerNo"
                            name="airConditioner"
                            type="radio"
                            value="false"
                            defaultChecked={isAirConditioner(car.airConditioner, "no")}
                            onChange={handleInput}
                        /> No
                    </div>
                </div>
                <div className="card-footer">
                    <div onClick={() => closeModal()} className="btn btn-danger">Close modal</div>
                    <button
                        className="btn btn-warning float-end"
                        onClick={(event) => editCar(event)} // onClick handler directly within the button element
                        name={car.license}
                    >
                        Edit Car
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EditModal;