import React, {useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
function RentCar({car, modalRentCar, setModalRentCar}) {

    const [inputData, setInputData] = useState({
        idCard: '',
        returnDate: '',
        number: '',
        personalData: '',
    });

    const [mistakes, setMistakes] = useState([]);
    const [rentedCar, setRentedCar] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value,
            startDate: new Date()
        });
    };

    const emptyInputFields = ()=>{
        setInputData({
            idCard: '',
            returnDate: '',
            number: '',
            personalData: '',
        })
    }

    const closeModal = ()=>{
        emptyInputFields()
        setModalRentCar(false);
    }

    const rentCar = async ()=>{
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }

        let result = await carService.rentCar({ ...inputData, license: car.license });
        if(result === true){
            setRentedCar(true);
        }
        emptyInputFields();
        setMistakes([]);
        setTimeout(()=>{
            setModalRentCar(false);
            setRentedCar(false)
        }, 3000);

    }
    return (
        <div className={`rent-car-model position-absolute top-50 start-50 ${modalRentCar === false ? "d-none" : ""} `}>
            {rentedCar && <div className="alert alert-success" role="alert">You successfully added a car</div>}
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
                    <div className="form-group w-50 offset-3">
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

                    <div className="form-group w-50 offset-3">
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

                    <div className="form-group w-50 offset-3">
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

                    <div className="form-group w-50 offset-3">
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
                </div>
                <div className="card-footer">
                    <div onClick={()=> closeModal()} className="btn btn-danger">Close modal</div>
                    <div onClick={()=> rentCar()} className="btn btn-primary float-end">Rent</div>
                </div>
            </div>
        </div>
    );
}

export default RentCar;