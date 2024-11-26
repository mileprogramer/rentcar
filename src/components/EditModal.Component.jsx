import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import "../css/modal.css"
import FormValidation from "../services/FormValidation";
import AirConditioningType from '../enums/AirConditiongType';
import TransmissionType from '../enums/TransmissionsType.js';
import MistakesAlert from "../components/MistakesAlert.Component.jsx"
import ModalOverlay from './ModalOverlay.Component.jsx';
import Lightbox from 'yet-another-react-lightbox';
import ImageUploading from 'react-images-uploading';
import { useQueryClient } from '@tanstack/react-query';
import { cacheNames } from '../config/cache.js';

function EditModal({modalActive, setModalActive, car,}) {

    const [activeOverlay, setActiveOverlay] = useState(true);
    const airConditionerType = new AirConditioningType();
    const transmissionType = new TransmissionType();
    const [editedCar, setEditedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [images, setImages] = useState([]);
    const [imageIndex, setIndexImage] = useState(1);
    const [lightbox, setOpenLightBox] = useState(false);
    const [inputData, setInputData] = useState({
        id: car.id,
        license: car.license,
        brand: car.brand,
        model: car.model,
        year: car.year,
        pricePerDay: car.price_per_day,
        transmissionType: car.transmission_type,
        airConditioner: car.air_conditioning_type,
        consumption: car.car_consumption,
    });
    const imageUploadErrors = {
        "maxFileSize": "Max file size for image is 2MB",
        "resolution": "Width of image must be less then 1000px, height of image must be less then 700px",
        "maxNumber": "You can upload up to 30 pictures",
    }
    const queryClient = useQueryClient();

    useEffect(() => {

        if(car === null){
            return ""
        }

        if (car.images) {
            setImages(car.images.map(image => ({ data_url: image })));
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

    const showErrorMsg = (error) => {
        console.log(error)
        // THIS NEEDS DO BE CORRECTED
        if(error.maxFileSize) {
            alert(imageUploadErrors.maxFileSize);
        }
        else if(error.resolution) {
            alert(imageUploadErrors.resolution)
        }
        else if(error.maxNumber) {
            alert(imageUploadErrors.maxNumber);
        }
    }

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

    const handleEditCar = async (event)=>{
        let mistakes = FormValidation.validateInputFields(inputData);
        
        if(mistakes.length !== 0){
            setMistakes(mistakes);
        }

        const formData = new FormData();
        formData.append('id', car.id);
        formData.append('license', inputData.license);
        formData.append('brand', inputData.brand);
        formData.append('model', inputData.model);
        formData.append('year', inputData.year);
        formData.append('price_per_day', inputData.pricePerDay);
        formData.append('car_consumption', inputData.consumption);
        formData.append('air_conditioning_type', inputData.airConditioner);
        formData.append('transmission_type', inputData.transmissionType);
        formData.append('status', car.status);

        images.forEach(image => {
            formData.append('images[]', image.file);
        });

        carService.updateCar(formData)
            .then(data =>{
                setEditedCar(data);
                queryClient.invalidateQueries(cacheNames.allCars)
            })
            .catch(errors =>{
                console.log(errors);
                setMistakes(errors);
            })
    }

    return (
        <>
        {activeOverlay && <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={closeModal} />}
        <div className={`edit-modal position-fixed ${modalActive === false ? "d-none" : ""} `}>
            {editedCar && <div className="alert alert-success" role="alert">{editedCar.message}</div>}
            <MistakesAlert mistakes={mistakes} />
            <div className="card" style={{"height": "100%"}}>
                    <div className="card-header">
                        Edit car with license: {car.license}
                    </div>
                    <div className="card-body" style={{height: "470px", overflowY:"auto"}}>
                        <p className='container-gallery-heading'>Car info</p>
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
                                <label htmlFor="airConditioner">Air conditioner</label>
                                <select value={inputData.airConditioner} className='form-select' name="airConditioner" id="airConditioner" onChange={(event) => {
                                    setInputData({...inputData, "airConditioner":event.target.value})
                                }}>
                                    {renderAirConditiongTypes()}
                                </select>
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="transmissionType">Transmission type</label>
                                <select value={inputData.transmissionType} className='form-select' name="transmissionType" id="transmissionType" onChange={(event) => {
                                    setInputData({...inputData, "transmissionType": event.target.value})
                                }}>
                                    {renderTransmissionTypes()}
                                </select>
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="pricePerDay">Price per day</label>
                                <input
                                    id="pricePerDay"
                                    name="pricePerDay"
                                    type="number"
                                    className="form-control"
                                    value={inputData.pricePerDay}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="consumption">Car consumption litars/100km</label>
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

                        
                    </div>
                    <p className='container-gallery-heading'>Car gallery</p>
                    <div className='container-gallery'>
                        
                    <ImageUploading
                        maxFileSize={2000000}
                        resolutionType = {"less"}
                        resolutionWidth = {1000}
                        resolutionHeight = {700}
                        multiple
                        value={images}
                        onChange={onChangeImage}
                        errors
                        onError={(errors) => showErrorMsg(errors)}
                        maxNumber={30}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                            // mine UI
                        <div className="upload__image-wrapper">
                            <div>Image size must be lower than 2048MB and width must be less than 1000px and height must be less than 700px  </div>
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
                            <div className='car-gallery'>
                                {imageList.map((image, index) => (
                                <div key={index}>
                                    <div 
                                        onClick={() => {
                                            setOpenLightBox(true)
                                            setIndexImage(index);
                                        }}
                                        key={index} 
                                        className="img-container"
                                    >
                                        <img src={image['data_url']} alt="" width="100" />
                                    </div>
                                    <div className="car-gallery-btns">
                                        <button 
                                            className='btn btn-warning'
                                            onClick={() => onImageUpdate(index)}>
                                                Update
                                        </button>
                                        <button 
                                            className='btn btn-danger' 
                                            onClick={() => onImageRemove(index)}>
                                                Remove
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        )}
                    </ImageUploading>

                    <Lightbox
                        index={imageIndex}
                        open={lightbox}
                        close={() => setOpenLightBox(false)}
                        slides={images.map(image => ({src: image.data_url}))}
                    />

                    </div>
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-danger"
                            onClick={() => closeModal()}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-warning float-end"
                            onClick={(event) => handleEditCar(event)} // onClick handler directly within the button element
                            name={car.license}
                        >
                            Edit Car
                        </button>

                    </div>
                </div>
        </div>
        </>
    );
}

export default EditModal;