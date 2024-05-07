import React, {useEffect, useState} from 'react';
import carService from "../services/carService";

import "../css/modal.css"
function EditModal({modalActive, setModalActive, setCars, car}) {

    const [editedCar, setEditedCar] = useState(false);
    const [mistakes, setMistakes] = useState(false);
    const [inputData, setInputData] = useState({
        license: '',
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        airConditioner: ''
    });
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        if (car) {
            setInputData({
                license: car.license || '',
                brand: car.brand || '',
                model: car.model || '',
                year: car.year || '',
                pricePerDay: car.pricePerDay || '',
                airConditioner: car.airConditioner || ''
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

    function print(whatToPrint){
        console.log(whatToPrint);
    }

    const editCar = async (event)=>{

        try{
            let result = await carService.updateCar(event.target.name, inputData);
            if(result){
                setCars(await carService.getCars());
                setEditedCar(true);
                setTimeout(() =>{
                    setInputData({});
                    setModalActive(false);
                    setEditedCar(false)
                }, 3000);
            }
        }catch (error){
            setMistakes(["Some mistake happend"]);
        }
    }

    return (
        <div className={`edit-modal position-absolute top-50 start-50 ${modalActive === false ? "d-none" : ""} `}>
            {editedCar && <div className="alert alert-success" role="alert">You successfully deleted a car</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error}</div>
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
                            id="license"
                            name="license"
                            type="text"
                            className="form-control"
                            value={inputData.license}
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