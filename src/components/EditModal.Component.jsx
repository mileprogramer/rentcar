import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import "../css/modal.css"
import FormValidation from "../services/FormValidation";
import AirConditioningType from '../enums/AirConditiongType';
import TransmissionType from '../enums/TransmissionsType.js';
import ModalOverlay from './ModalOverlay.Component.jsx';
import { useDispatch } from 'react-redux';
import { editCar } from '../redux/allCars.slicer.js';
import Lightbox from 'yet-another-react-lightbox';
import ImageUploading from 'react-images-uploading';

function EditModal({modalActive, setModalActive, currentPage, car, typeIsSearched}) {

    const [activeOverlay, setActiveOverlay] = useState(false);
    const airConditionerType = new AirConditioningType();
    const transmissionType = new TransmissionType();
    const [editedCar, setEditedCar] = useState(false);
    const [mistakes, setMistakes] = useState(false);
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
        numberOfDoors: car.number_of_doors,
        personFitIn: car.person_fit_in,
        transmissionType: car.transmission_type,
        airConditioner: car.air_conditioning_type,
        consumption: car.car_consumption,
    });
    const dispatch = useDispatch();

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

        let carData = {
            id: car.id,
            license: inputData.license,
            brand: inputData.brand,
            model: inputData.model,
            year: inputData.year,
            price_per_day: inputData.pricePerDay,
            number_of_doors: inputData.numberOfDoors,
            person_fit_in: inputData.personFitIn,
            car_consumption: inputData.consumption,
            air_conditioning_type: inputData.airConditioner,
            transmission_type: inputData.transmissionType,
            status: car.status,
        }

        carService.updateCar(carData)
            .then(data =>{
                dispatch(editCar({"page":currentPage, "car": carData, "type": typeIsSearched}));
                setEditedCar(data);
                setTimeout(()=>{
                    setEditedCar(false);
                }, 3000)
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    }

    return (
        <>
        <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={closeModal} />
        <div className={`edit-modal position-fixed ${modalActive === false ? "d-none" : ""} `}>
            {editedCar && <div className="alert alert-success" role="alert">{editedCar.message}</div>}
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message}</div>
                    ))}
                </div>
            )}
            <div className="card" style={{"height": "100%"}}>
                    <div className="card-header">
                        Edit car with license: {car.license}
                    </div>
                    <div className="card-body" style={{height: "470px", overflowY:"auto"}}>
                        <p className='container-gallery-heading'>Car info</p>
                        <div className="row">
                            <div className="form-group col-3">
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
                            <select value={inputData.airConditioner} className='form-select' name="airConditioner" id="airConditioner" onChange={(event) => {
                                setInputData({...inputData, "airConditioner":event.target.value})
                            }}>
                                {renderAirConditiongTypes()}
                            </select>
                        </div>

                        <div className="form-group my-3 col-4">
                            <label htmlFor="transmissionType">Transmission type</label>
                            <select value={inputData.transmissionType} className='form-select' name="transmissionType" id="transmissionType" onChange={(event) => {
                                setInputData({...inputData, "transmissionType": event.target.value})
                            }}>
                                {renderTransmissionTypes()}
                            </select>
                        </div>
                    </div>
                    <p className='container-gallery-heading'>Car gallery</p>
                    <div className='container-gallery'>
                        
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
                                        <button className='btn btn-warning' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => onImageRemove(index)}>Remove</button>
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