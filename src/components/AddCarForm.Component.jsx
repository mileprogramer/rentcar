import React, { useState } from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
import CarStatus from '../enums/CarStatus';
import AirConditioningType from '../enums/AirConditiongType';
import TransmissionType from '../enums/TransmissionsType';

function AddCarForm(props) {

    const carStatus = new CarStatus();
    const airConditionerType = new AirConditioningType();
    const transmissionType = new TransmissionType();

    const [inputData, setInputData] = useState({
        license: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        numberOfdoors: 0,
        personFitIn: 0,
        consumption: 0,
        airConditioner: '',
        transmissionType: '',
        carStatus: carStatus.available
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

    const renderAirConditiongTypes = () =>{
        let content = [];
        let types = airConditionerType.getKeys();
        content.push(<option value="">Select air conditioning type</option>);
        for (let prop in types) {
            content.push(
                <option key={prop} value={prop}>
                    {types[prop]}
                </option>
            );
        }
        return content;
    }

    const renderTransmissionTypes = () =>{
        let content = [];
        let types = transmissionType.getKeys();
        content.push(<option value="">Select transmission type</option>);
        for (let prop in types) {
            content.push(
                <option key={prop} value={prop}>
                    {types[prop]}
                </option>
            );
        }
        return content;
    }

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

            <div className="row">
                <div className="form-group col-4">
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

                <div className="form-group col-4">
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

                <div className="form-group col-4">
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
            </div>

            <div className='row mt-3'>
                <div className="form-group col-4">
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

                <div className="form-group col-4">
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

                <div className="form-group col-4">
                    <label htmlFor="price">Car consumption litars/100km</label>
                    <input
                        id="consumption"
                        name="consumption"
                        type="number"
                        className="form-control"
                        value={inputData.consumption}
                        onChange={handleInput}
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group my-3 col-6">
                    <label htmlFor="airConditioner">Air conditioner</label>
                    <select className='form-select' name="airConditioner" id="airConditioner" oncChange={handleInput}>
                        {renderAirConditiongTypes()}
                    </select>
                </div>

                <div className="form-group my-3 col-6">
                    <label htmlFor="transmissionType">Transmission type</label>
                    <select className='form-select' name="transmissionType" id="transmissionType" oncChange={handleInput}>
                        {renderTransmissionTypes()}
                    </select>
                </div>
            </div>


            <button className="btn btn-primary w-50 offset-3 mt-5" onClick={addCar}>
                Add Car
            </button>
        </div>
    );
}

export default AddCarForm;
