import React, {useEffect, useRef, useState} from 'react';
import "../css/modal.css"
import carService from "../services/carService";
import { useDispatch, useSelector } from 'react-redux';
import { selectCarData, selectCurrentPage } from '../redux/car.slicer';
import { setRentedCar } from "../redux/car.slicer"
import SearchableDropdown from './SearchableDropDown.Component';
import userSerice from '../services/userService';
import dayjs from 'dayjs';

function RentCar({modalRentCar, setModalRentCar, setActiveOverlay, carFromPage, carLicense}) {

    const carData = useSelector(state => selectCarData(state, carLicense, carFromPage));
    const selectedUser = useRef({});
    const page = useSelector(state => selectCurrentPage(state));
    const [users, setUsers] = useState([]);
    const addNewUser = useRef(false);
    const [oldCustomer, setOldCustomer] = useState(true);
    const [newCustomer, setNewCustomer] = useState(false);
    const [mistakes, setMistakes] = useState(false);
    const [rentMessage, setRentMessage] = useState({});
    const dispatch = useDispatch();
    
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

    useEffect(()=> {
        setInputData(initialInputData);
        setMistakes(false)
    }, [carData, oldCustomer])

    

    useEffect(()=> {
        userSerice.getUsers()
            .then(data => {
                setUsers(data.users);
            })
            .catch(errors => {
                alert(errors);
            })
    }, [addNewUser])

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const emptyInputFields = ()=>{
        setInputData(initialInputData)
    }

    const calculaDays = () => {
        if(inputData.returnDate){
            return dayjs(inputData.returnDate).diff(inputData.startDate, "day");
        }
        return "";
    }

    const closeModal = ()=>{
        selectedUser.current = {};
        setRentMessage({});
        setActiveOverlay(false)
        emptyInputFields()
        setModalRentCar(false);
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
                emptyInputFields();
                setMistakes([]);
                dispatch(setRentedCar({"page": page, "carId": rentCarData.car_id}))
                event.target.disabled = false;
                setTimeout(()=>{
                    if(modalRentCar)
                    {
                        closeModal();
                    }
                }, 3000);
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
                                options={users}
                                label="name"
                                id="id"
                                validationErrors={mistakes.userId}
                                additionalLabel = "card_id"
                                selectedVal={selectedUser.current?.name}
                                inputLabel="Type or choose old customer"
                                handleChange={(val) => {
                                    selectedUser.current = val;
                                    setInputData({...inputData, "userId": val?.id})
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
                                <input
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    max = {100}
                                    value={inputData?.discount}
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
                        name={carData?.license}
                    >
                        Rent
                    </button>

                </div>
            </div>
        </div>
    );
}

export default RentCar;