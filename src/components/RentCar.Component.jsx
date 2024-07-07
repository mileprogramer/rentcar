import React, {useEffect, useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
function RentCar({modalRentCar, setModalRentCar, setCars, car, setActiveOverlay}) {
    const [inputData, setInputData] = useState({
        license: car.license,
        pricePerDay: car.pricePerDay,
        idCard: '',
        returnDate: '',
        startDate: generateNowDate(),
        number: '',
        personalData: '',
    });

    const [mistakes, setMistakes] = useState([]);
    const [rentedCar, setRentedCar] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    function generateNowDate(){
        let now = new Date();
        return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
    }

    const emptyInputFields = ()=>{
        setInputData({
            pricePerDay: car.pricePerDay,
            license: '',
            idCard: '',
            returnDate: '',
            number: '',
            personalData: '',
        })
    }

    const closeModal = ()=>{
        setActiveOverlay(false);
        emptyInputFields()
        setModalRentCar(false);
    }

    const rentCar = (event)=>{
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }
        carService.rentCar(inputData)
            .then(data =>{
                setCars(inputData); // refresh the page that is car rented
                setRentedCar(data);
                emptyInputFields();
                setMistakes([]);
                setTimeout(()=>{
                    setModalRentCar(false);
                    setRentedCar(false)
                }, 3000);
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    }
    return (
        <div className={`rent-car-model position-absolute top-50 start-50 ${modalRentCar === false ? "d-none" : ""} `}>
            {rentedCar && <div className="alert alert-success" role="alert">{rentedCar.message}</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
            <div className="card">
                <div className="card-header">
                    License: {car.license}
                </div>
                <div className="card-body">
                    <div className="form-group my-1">
                        <label htmlFor="brand">Type first name and last name</label>
                        <input
                            id="personalData"
                            name="personalData"
                            type="text"
                            className="form-control"
                            value={inputData.personalData}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group my-1">
                        <label htmlFor="brand">Type phone number</label>
                        <input
                            id="number"
                            name="number"
                            type="number"
                            className="form-control"
                            value={inputData.number}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group my-1">
                        <label htmlFor="brand">Date of taking car</label><br/>
                        <em>If input is empty by default it will be today date</em>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            className="form-control"
                            value={inputData.startDate}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group my-1">
                        <label htmlFor="brand">Date of return car</label>
                        <input
                            id="returnDate"
                            name="returnDate"
                            type="date"
                            className="form-control"
                            value={inputData.returnDate}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group my-1">
                        <label htmlFor="brand">ID card</label>
                        <input
                            id="idCard"
                            name="idCard"
                            type="text"
                            className="form-control"
                            value={inputData.idCard}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group my-1">
                        <label htmlFor="brand">Price per day</label>
                        <input
                            id="pricePerDay"
                            name="pricePerDay"
                            type="text"
                            className="form-control"
                            value={inputData.pricePerDay}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <div onClick={() => closeModal()} className="btn btn-danger">Close modal</div>
                    <button
                        className="btn btn-primary float-end"
                        onClick={(event) => rentCar(event)} // onClick handler directly within the button element
                        name={car.license}
                    >
                        Rent
                    </button>

                </div>
            </div>
        </div>
    );
}

export default RentCar;