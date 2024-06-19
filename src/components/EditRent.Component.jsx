import React, {useEffect, useState} from 'react';
import FormValidation from "../services/FormValidation";
import carService from "../services/carService";

function EditRent({rentedCarData, setRentCar, setRentModal}) {
    const [editedRent, setEditedRent] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [inputData, setInputData] = useState({
        license: rentedCarData.license,
        returnDate: rentedCarData.returnDate,
        idCard: rentedCarData.idCard,
        personalData: rentedCarData.personalData,
        phoneNumber: rentedCarData.phoneNumber,
    });

    useEffect(() => {
        if (rentedCarData) {
            setInputData({
                license: rentedCarData.license,
                returnDate: rentedCarData.returnDate,
                idCard: rentedCarData.idCard,
                personalData: rentedCarData.personalData,
                phoneNumber: rentedCarData.phoneNumber,
            });
        }
    }, [rentedCarData]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const emptyInputFields = ()=>{
        setInputData({
            returnDate: rentedCarData.returnDate,
            idCard: rentedCarData.idCard,
            personalData: rentedCarData.personalData,
            phoneNumber: rentedCarData.phoneNumber,
        })
    }

    const closeModal = ()=>{
        setRentModal(false);
        emptyInputFields();
    }
    function print(data){
        console.log(data);
    }

    const editRent = (event)=>{
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            return setMistakes(mistakes);
        }
        carService.editRent(inputData)
            .then(data =>{
                setRentCar(inputData);
                setEditedRent(data);
                setTimeout(()=>{
                    setEditedRent(false);
                },5000)
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    }

    return (
        <div className={`edit-modal position-absolute top-50 start-50`}>
            {editedRent && <div className="alert alert-success" role="alert">{editedRent.message || editedRent}</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
            <div className="card">
                <div className="card-header">
                    License: {rentedCarData.license}
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
                            name="phoneNumber"
                            type="phoneNumber"
                            className="form-control"
                            value={inputData.phoneNumber}
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
                            value={inputData["returnDate"]}
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
                </div>
                <div className="card-footer">
                    <div onClick={() => closeModal()} className="btn btn-danger">Close modal</div>
                    <button
                        className="btn btn-primary float-end"
                        onClick={(event) => editRent(event)} // onClick handler directly within the button element
                        name={rentedCarData.license}
                    >
                        Edit rent
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EditRent;