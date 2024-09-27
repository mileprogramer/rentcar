import React, {useEffect, useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
import { useSelector } from 'react-redux';
import { selectCarData } from '../redux/car.slicer';
import SearchableDropdown from './SearchableDropDown.Component';
import userSerice from '../services/userService';

function RentCar({modalRentCar, setModalRentCar, carFromPage, carLicense, setActiveOverlay}) {

    const carData = useSelector(state => selectCarData(state, carLicense, carFromPage));
    const [users, setUsers] = useState([]);
    const [oldCustomer, setOldCustomer] = useState(true);
    const [newCustomer, setNewCustomer] = useState(false);

    useEffect(()=> {
        userSerice.getUsers()
            .then(data => {
                setUsers(data.users);
            })
            .catch(errors => {
                alert(errors);
            })
    }, [])

    const [inputData, setInputData] = useState({
        license: carData.license,
        pricePerDay: carData.price_per_day,
        discount: 0,
        userId: "",
        idCard: '',
        personalData: '',
        phoneNumber: '',
        returnDate: '',
        startDate: generateNowDate(),
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
            pricePerDay: carData.pricePerDay,
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
        // add validation does taking date is before returning date
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }
        carService.rentCar(inputData)
            .then(data =>{
                // setCars(inputData); // refresh the page that is car rented
                // setRentedCar(data);
                // emptyInputFields();
                // setMistakes([]);
                // setTimeout(()=>{
                //     setModalRentCar(false);
                //     setRentedCar(false)
                // }, 3000);
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
                    License: {carData.license}
                </div>
                <div className="card-body">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${oldCustomer ? "active" : ""}`}
                                onClick={() => {
                                    setOldCustomer(true);
                                    setNewCustomer(false);
                                }}
                            >Choose old customer</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${newCustomer ? "active" : ""}`}
                                onClick={() => {
                                    setOldCustomer(false);
                                    setNewCustomer(true);
                                }}
                            >New customer</button>
                        </li>
                    </ul>
                    <div className='form-parent'>
                        {
                            oldCustomer && 
                            <SearchableDropdown
                                options={users}
                                label="name"
                                id="id"
                                additionalLabelText = "card_id"
                                selectedVal={inputData.userId}
                                inputLabel="Type or choose old customer"
                                handleChange={(val) => setInputData({...inputData, "userId": val})}
                            />
                        }
                        
                        {
                            newCustomer &&
                        <div className='row justify-content-between'>
                            <div className="form-group my-1 col-3">
                                <label htmlFor="brand"> ID card of user </label>
                                <input
                                    id="idCard"
                                    name="idCard"
                                    type="text"
                                    className="form-control"
                                    value={inputData.idCard}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="form-group my-1 col-5">
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

                            <div className="form-group my-1 col-4">
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
                        </div>
                        }
                        <div className="form-group my-1">
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="brand">Date of taking car</label><br/>
                                <em>If input is empty by default it will be today date</em>
                            </div>
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
                                value={inputData.discount}
                                onChange={handleInput}
                            />
                        </div>

                        <div className='row justify-content-between'>
                            <div className="form-group my-1 col-3">
                                <label htmlFor="discount">Discount in %</label>
                                <input
                                    id="discount"
                                    name="discount"
                                    type="text"
                                    className="form-control"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group my-1 col-8">
                                <label htmlFor="brand">Reason for discount</label>
                                <textarea
                                    rows={2}
                                    id="reasonForDiscount"
                                    name="reasonForDiscount"
                                    type="text"
                                    className="form-control"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        
                        <div className='form-group my-1'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <td>Days</td>
                                        <td>Price per day</td>
                                        <td>Discount</td>
                                        <td>Total price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>10</td>
                                        <td>{inputData.pricePerDay}$</td>
                                        <td>{inputData.discount}%</td>
                                        <td className='fw-bold'>
                                            { inputData.days * inputData.pricePerDay - inputData.discount * 100  }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="card-footer p-3">
                    <div onClick={() => closeModal()} className="btn btn-danger">Close modal</div>
                    <button
                        className="btn btn-primary float-end"
                        onClick={(event) => rentCar(event)} // onClick handler directly within the button element
                        name={carData.license}
                    >
                        Rent
                    </button>

                </div>
            </div>
        </div>
    );
}

export default RentCar;