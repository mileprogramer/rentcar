import React, { useState } from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
import CarStatus from '../enums/CarStatus';
import AirConditioningType from '../enums/AirConditiongType';
import TransmissionType from '../enums/TransmissionsType';
import ImageUploading from 'react-images-uploading';

function AddCarForm(props) {

    const carStatus = new CarStatus();
    const airConditionerType = new AirConditioningType();
    const transmissionType = new TransmissionType();
    const initialInputData = {
        license: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        numberOfDoors: 5,
        personFitIn: 4,
        consumption: 0,
        airConditioner: '',
        transmissionType: '',
    };
    const [inputData, setInputData] = useState(initialInputData);
    const [lightbox, setOpenLightBox] = useState(false);
    const [images, setImages] = useState([]);
    const [addedCar, setAddedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const onChangeImage = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const renderAirConditiongTypes = () =>{
        let content = [];
        let types = airConditionerType.getKeys();
        content.push(<option key="default" value="">Select air conditioning type</option>);
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
        content.push(<option key="default" value="">Select transmission type</option>);
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
        let mistakes = FormValidation.validateInputFields({...inputData, images});
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return;
        }

        const formData = new FormData();
        formData.append('license', inputData.license);
        formData.append('brand', inputData.brand);
        formData.append('model', inputData.model);
        formData.append('year', inputData.year);
        formData.append('price_per_day', inputData.price);
        formData.append('number_of_doors', inputData.numberOfDoors);
        formData.append('person_fit_in', inputData.personFitIn);
        formData.append('car_consumption', inputData.consumption);
        formData.append('air_conditioning_type', inputData.airConditioner);
        formData.append('transmission_type', inputData.transmissionType);
        formData.append('status', carStatus.available);
        
        images.forEach(image => {
            formData.append('images[]', image.file);
        });

        carService.addCar(formData)
            .then(data =>{
                setMistakes([]);
                setAddedCar(true);
                setTimeout(()=> {
                    setImages([]);
                    setInputData(initialInputData);
                    setAddedCar(false);
                }, 3000)
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
                <div className="form-group col-3">
                    <label htmlFor="brand">Type license</label>
                    <input
                        id="license"
                        name="license"
                        type="text"
                        className="form-control"
                        value={inputData.license}
                        onChange={(event) => {
                            event.target.value = event.target.value.toUpperCase();
                            handleInput(event);
                        }}
                    />
                </div>

                <div className="form-group col-3">
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

                <div className="form-group col-3">
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

                <div className="form-group col-3">
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
            </div>

            <div className='row mt-3'>
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

                <div className="form-group col-4">
                    <label htmlFor="numberOfDoors">Number of doors</label>
                    <input
                        id="numberOfDoors"
                        name="numberOfDoors"
                        type="number"
                        className="form-control"
                        value={inputData.numberOfDoors}
                        onChange={handleInput}
                    />
                </div>
            </div>

            <div className="row">

                <div className="form-group my-3 col-4">
                    <label htmlFor="personFitIn">Person fit in</label>
                    <input
                        id="personFitIn"
                        name="personFitIn"
                        type="number"
                        className="form-control"
                        value={inputData.personFitIn}
                        onChange={handleInput}
                    />
                </div>

                <div className="form-group my-3 col-4">
                    <label htmlFor="airConditioner">Air conditioner</label>
                    <select className='form-select' name="airConditioner" id="airConditioner" onChange={(event) => {
                        setInputData({...inputData, "airConditioner":event.target.value})
                    }}>
                        {renderAirConditiongTypes()}
                    </select>
                </div>

                <div className="form-group my-3 col-4">
                    <label htmlFor="transmissionType">Transmission type</label>
                    <select className='form-select' name="transmissionType" id="transmissionType" onChange={(event) => {
                        setInputData({...inputData, "transmissionType": event.target.value})
                    }}>
                        {renderTransmissionTypes()}
                    </select>
                </div>

                <ImageUploading
                        multiple
                        value={images}
                        onChange={onChangeImage}
                        maxNumber={30}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <p className='d-inline-block pe-3'>Add image by</p>
                            <button
                                className='btn btn-primary'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                            Click or Drop here
                            </button>
                            &nbsp;
                            <div className='car-gallery' style={{"gridTemplateColumns": "repeat(5, 1fr)"}}>
                                {imageList.map((image, index) => (
                                <div key={index} className='d-flex'>
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="car-gallery-btns-vertical">
                                        <button className='btn btn-warning' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        )}
                    </ImageUploading>

            </div>

            <button className="btn btn-primary w-50 offset-3 mt-5" onClick={addCar}>
                Add Car
            </button>
        </div>
    );
}

export default AddCarForm;
