import React, {useEffect, useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import { useSelector } from 'react-redux';
import { selectCarData } from '../redux/car.slicer';
import SearchableDropdown from './SearchableDropDown.Component';
import userSerice from '../services/userService';
import dayjs from 'dayjs';

function RentCar({modalRentCar, setModalRentCar, setActiveOverlay, carFromPage, carLicense}) {
    
    const carData = useSelector(state => selectCarData(state, carLicense, carFromPage));
    const [users, setUsers] = useState([]);
    const [oldCustomer, setOldCustomer] = useState(true);
    const [newCustomer, setNewCustomer] = useState(false);
    const [inputData, setInputData] = useState({
        license: carData.license,
        pricePerDay: carData.price_per_day,
        discount: 0,
        reasonForDiscount: 0,
        userId: "",
        idCard: '',
        personalData: '',
        phoneNumber: '',
        returnDate: '',
        startDate: dayjs().format("YYYY-MM-DD"),
    });

    const [mistakes, setMistakes] = useState(false);
    const [rentedCar, setRentedCar] = useState(false);

    useEffect(()=> {
        userSerice.getUsers()
            .then(data => {
                setUsers(data.users);
            })
            .catch(errors => {
                alert(errors);
            })
    }, [])

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const emptyInputFields = ()=>{
        setInputData({
            license: "",
            pricePerDay: "",
            discount: 0,
            reasonForDiscount: 0,
            userId: "",
            idCard: '',
            personalData: '',
            phoneNumber: '',
            returnDate: '',
            startDate: "",
        })
    }

    const calculaDays = () => {
        if(inputData.returnDate){
            return dayjs(inputData.returnDate).diff(inputData.startDate, "day");
        }
        return "";
    }

    const closeModal = ()=>{
        setActiveOverlay(false)
        emptyInputFields()
        setModalRentCar(false);
    }

    const validateInputFields = (inputData) => {
        let hasError = false;
        const mistakes = {
            license: [],
            pricePerDay: [],
            discount: [],
            reasonForDiscount: [],
            userId: [],
            idCard: [],
            personalData: [],
            phoneNumber: [],
            returnDate: [],
        };
        if(!inputData.userId && oldCustomer){
            mistakes.userId.push("You must choose user")
            hasError = true;
        }

        if(!inputData.personalData && newCustomer){
            mistakes.personalData.push("You must fill user personal data")
            hasError = true;
        }

        if(!inputData.phoneNumber && newCustomer){
            mistakes.phoneNumber.push("You must fill the phone number")
            hasError = true;
        }

        if(!inputData.idCard && newCustomer){
            mistakes.idCard.push("You must fill the phone number");
            hasError = true;
        }

        if(inputData.discount > 100){
            mistakes.discount.push("Discount can not be grater than 100%");
            hasError = true;
        }
        
        if(inputData.discount > 0 && !inputData.reasonForDiscount){
            mistakes.reasonForDiscount.push("You must fill reason for discount");
            hasError = true;
        }

        if(!inputData.returnDate || dayjs(inputData.returnDate).isBefore(inputData.startDate)){
            mistakes.reasonForDiscount.push("Return date must be after start date");
            hasError = true;
        }

        if(hasError)
        {
            setMistakes(mistakes);
            return;
        }
        rentCar();
    }

    const rentCar = (event)=>{
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
        <div className={`rent-car-model position-fixed top-0 row align-center ${modalRentCar === true ? "rent-car-model-active" : ""} `}>
            {rentedCar && <div className="alert alert-success" role="alert">{rentedCar.message}</div>}
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
                                validationErrors={mistakes.userId}
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
                                {
                                    mistakes !== false && mistakes.discount ? (
                                        <ul>
                                            {mistakes.idCard.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
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
                                {
                                    mistakes !== false && mistakes.personalData ? (
                                        <ul>
                                            {mistakes.personalData.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
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
                                {
                                    mistakes !== false && mistakes.phoneNumber ? (
                                        <ul>
                                            {mistakes.phoneNumber.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
                            </div>
                        </div>
                        }
                        <div className="form-group my-1">
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="brand">Date of taking car</label><br/>
                                <em>By default it will be today date</em>
                            </div>
                            <input
                                id="startDate"
                                name="startDate"
                                disabled = {true}
                                type="date"
                                className="form-control"
                                value={inputData.startDate}
                                onChange={handleInput}
                            />
                            {
                                    mistakes !== false && mistakes.startDate ? (
                                        <ul>
                                            {mistakes.startDate.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                            }
                        </div>

                        <div className="form-group my-1">
                            <label htmlFor="brand">Date of return car</label>
                            <input
                                id="returnDate"
                                name="returnDate"
                                type="date"
                                className="form-control"
                                min={dayjs(inputData.startDate).add(1, 'day').format('YYYY-MM-DD')}
                                value={inputData.returnDate}
                                onChange={handleInput}
                            />
                            {
                                mistakes !== false && mistakes.returnDate ? (
                                    <ul>
                                        {mistakes.returnDate.map((el, index) => (
                                            <li className="text-danger" key={index}>{el}</li>
                                        ))}
                                    </ul>
                                ) : ""
                            }
                        </div>

                        <div className='row justify-content-between'>
                            <div className="form-group my-1 col-3">
                                <label htmlFor="discount">Discount in %</label>
                                <input
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    max = {100}
                                    className="form-control"
                                    onChange={handleInput}
                                />
                                {
                                    mistakes !== false && mistakes.discount ? (
                                        <ul>
                                            {mistakes.discount.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
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
                                {
                                    mistakes !== false && mistakes.reasonForDiscount ? (
                                        <ul>
                                            {mistakes.reasonForDiscount.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
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
                                        <td>{ calculaDays() }</td>
                                        <td>{inputData.pricePerDay}$</td>
                                        <td>{inputData.discount}%</td>
                                        <td className='fw-bold'>
                                            {
                                                Math.round(calculaDays() * inputData.pricePerDay * (1 - inputData.discount / 100), 2) 
                                            }
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
                        onClick={(event) => validateInputFields(event)} // onClick handler directly within the button element
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