import React, { useState } from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";

function AddCarForm(props) {
    const [inputData, setInputData] = useState({
        license: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        airConditioner: ''
    });

    const [addedCar, setAddedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const addCar = () => {
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
        }

        carService.addCar(inputData)
            .then(data =>{
                setAddedCar(true);
            })
            .catch(errors =>{
                setMistakes(errors);
            })

    };

    return (
        <div className="container">
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}

            {addedCar && <div className="alert alert-success" role="alert">You successfully added a car</div>}

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
                    id="price"
                    name="price"
                    type="number"
                    className="form-control"
                    value={inputData.price}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3 d-flex gap-3 my-3">
                <label htmlFor="airConditioner">Air conditioner</label>
                <input
                    id="airConditionerYes"
                    name="airConditioner"
                    type="radio"
                    value= "true"
                    onChange={handleInput}
                    checked={inputData.airConditioner === 'true'}
                /> Yes
                <input
                    id="airConditionerNo"
                    name="airConditioner"
                    type="radio"
                    value= "false"
                    onChange={handleInput}
                    checked={inputData.airConditioner === 'false'}
                /> No
            </div>

            <button className="btn btn-primary w-50 offset-3" onClick={addCar}>
                Add Car
            </button>
        </div>
    );
}

export default AddCarForm;
