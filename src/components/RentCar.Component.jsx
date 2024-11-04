import React, {useEffect, useRef, useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import SearchableDropdown from './SearchableDropDown.Component';
import dayjs from 'dayjs';
import userService from '../services/userService';
import { useQuery } from '@tanstack/react-query';
import { HandleInput } from '../helpers/functions';
import ModalOverlay from './ModalOverlay.Component';
import { useQueryClient } from '@tanstack/react-query';

function RentCar({carData, modalRentCar, setModalRentCar}) {

    const [isActiveOverlay, setActiveOverlay] = useState(false);
    const addNewUser = useRef(false);
    const [inputUserValue, setInputUserValue] = useState("")
    const [oldCustomer, setOldCustomer] = useState(true);
    const [newCustomer, setNewCustomer] = useState(false);
    const [mistakes, setMistakes] = useState(false);
    const [rentMessage, setRentMessage] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient();

    const { data: users, error, isLoading } = useQuery({
        queryKey: ['searchUsers', searchTerm],
        queryFn: () => userService.search(searchTerm),
        enabled: !!searchTerm,
        staleTime: 30000,
        select: (data) => data.users || []
    });

    const initialInputData = {  
        carId: carData?.id,
        license: carData?.license || null,
        pricePerDay: carData?.price_per_day ||  null,
        discount: 0,
        reasonForDiscount: "",
        userId: "",
        cardId: '',
        email: "",
        personalData: '',
        phone: '',
        returnDate: '',
        startDate: dayjs().format("YYYY-MM-DD"),
    };
    const [inputData, setInputData] = useState(initialInputData);
    const handleInput = new HandleInput(setInputData, inputData);

    useEffect(()=> {
        setInputData(initialInputData);
        setMistakes(false)
    }, [carData, oldCustomer])

    const calculateDays = () => {
        if(inputData.returnDate){
            return dayjs(inputData.returnDate).diff(inputData.startDate, "day");
        }
        return "";
    }

    function closeModal(){
        setActiveOverlay(false)
        setRentMessage({});
        setActiveOverlay(false);
        setInputData(initialInputData);
        setModalRentCar(false);
        setInputUserValue("")
    }

    const validateInputFields = (event) => {
        let hasError = false;
        const mistakes = {
            license: [],
            pricePerDay: [],
            discount: [],
            reasonForDiscount: [],
            userId: [],
            cardId: [],
            personalData: [],
            phone: [],
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

        if(!inputData.phone && newCustomer){
            mistakes.phone.push("You must fill the phone number")
            hasError = true;
        }

        if(!inputData.cardId && newCustomer){
            mistakes.cardId.push("You must fill the card id");
            hasError = true;
        }
        
        if(+inputData.discount > 100){
            mistakes.discount.push("Discount can not be grater than 100%");
            hasError = true;
        }
        
        if(inputData.discount > 0 && !inputData.reasonForDiscount){
            mistakes.reasonForDiscount.push("You must fill reason for discount");
            hasError = true;
        }

        if(!inputData.returnDate || dayjs(inputData.returnDate).isBefore(inputData.startDate)){
            mistakes.returnDate.push("Return date must be after start date");
            hasError = true;
        }

        if(hasError)
        {
            setMistakes(mistakes);
            return;
        }
        rentCar(event);
    }

    const rentCar = (event)=>{
        event.target.disabled = true;
        let rentCarData = {  
            car_id: inputData.carId,
            license: inputData.license,
            discount: inputData.discount,
            reason_for_discount: inputData.reasonForDiscount,
            user_id: inputData.userId,
            card_id: inputData.cardId,
            name: inputData.personalData,
            phone: inputData.phone,
            email: inputData.email,
            return_date: inputData.returnDate,
            start_date: inputData.startDate,
        };
        if(oldCustomer){
            delete rentCarData.name;
            delete rentCarData.phone;
            delete rentCarData.card_id;
            delete rentCarData.email;
        }
        else{
            addNewUser.current = true;
            delete rentCarData.user_id;
        }
        
        carService.rentCar(rentCarData)
            .then(data =>{
                setRentMessage({"message": data.message});
                setMistakes([]);
                event.target.disabled = true;
                queryClient.invalidateQueries(['availableCars']);
            })
            .catch(errors =>{
                event.target.disabled = false;
                setMistakes(errors);
            })
    }

    if(modalRentCar === false && !carData){
        // initial load
        return <div className={`rent-car-model rent-car-model-unactive`}></div>;
    }

    return (
        <>
        {
            modalRentCar && 
            <ModalOverlay
                bgColor='transparent'
                setModalActive={(showOrHide) => {closeModal()}} 
                setActiveOverlay = {(showOrHide) => setActiveOverlay(showOrHide)} 
            />
        }
        <div className={`rent-car-model row align-center ${modalRentCar === true ? "rent-car-model-active" : "rent-car-model-unactive"} `}>
            {rentMessage?.message && <div className="alert alert-success" role="alert">{rentMessage.message}</div>}
            <div className="card">
                <div className="card-header">
                    License: {carData?.license}
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
                                options = {users} 
                                renderName = {(user) => user.name + " " + user.card_id}
                                isLoading = {isLoading}
                                setSearchTerm = {setSearchTerm}
                                inputValue = {inputUserValue}
                                setInputValue = {setInputUserValue}
                                resetSearch = {() => setSearchTerm("")}
                                validationErrors={error}
                                inputLabel="Type or choose old customer"
                                selectOption={(val) => {
                                    setInputData({...inputData, "userId": val.id})
                                }}
                            />
                        }
                        
                        {
                            newCustomer &&
                        <div className='row justify-content-between'>
                            <div className="form-group my-1 col-6">
                                <label htmlFor="brand"> ID card of user </label>
                                <input
                                    id="cardId"
                                    name="cardId"
                                    type="text"
                                    className="form-control"
                                    value={inputData.cardId}
                                    onChange={handleInput}
                                />
                                {
                                    mistakes !== false && mistakes.cardId ? (
                                        <ul>
                                            {mistakes.cardId.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
                            </div>

                            <div className="form-group my-1 col-6">
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

                            <div className="form-group my-1 col-6">
                                <label htmlFor="brand">Type phone number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    className="form-control"
                                    value={inputData.phone}
                                    onChange={handleInput}
                                />
                                {
                                    mistakes !== false && mistakes.phone ? (
                                        <ul>
                                            {mistakes.phone.map((el, index) => (
                                                <li className="text-danger" key={index}>{el}</li>
                                            ))}
                                        </ul>
                                    ) : ""
                                }
                            </div>
                            <div className="form-group my-1 col-6">
                                <label htmlFor="brand">Type email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    value={inputData.email}
                                    onChange={handleInput}
                                />
                                {
                                    mistakes !== false && mistakes.email ? (
                                        <ul>
                                            {mistakes.email.map((el, index) => (
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
                                <div className="input-group">
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        max = {100}
                                        value={inputData?.discount}
                                        className="form-control"
                                        onChange={handleInput}
                                    />
                                    <span className='input-group-text'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                                            <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                        </svg>
                                    </span>
                                </div>
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
                                    value={inputData?.reasonForDiscount}
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
                                        <td>{ calculateDays() }</td>
                                        <td>{inputData.pricePerDay}$</td>
                                        <td>{inputData.discount}%</td>
                                        <td className='fw-bold'>
                                            {
                                                Math.round(calculateDays() * inputData.pricePerDay * (1 - inputData.discount / 100), 2) 
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
                        onClick={(event) => validateInputFields(event)}
                        name={carData?.license}
                    >
                        Rent
                    </button>

                </div>
            </div>
        </div>
        </>
    );
}

export default RentCar;