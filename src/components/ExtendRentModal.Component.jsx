import React, { useState } from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
import "../css/modal.css"
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { refreshFirstPage, returnCar } from '../redux/rentedCars.slicer';
import { formatPrice } from '../helpers/functions';
import { refreshStatFirstPage } from '../redux/statistics.slicer';

dayjs.extend(customParseFormat);

function ExtendRentModal({carData, currentPage, closeModal}) {

    const dispatch = useDispatch();
    const [returnedCar, setReturnedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [extendRentData, setExtendRentData] = useState({
        car_id: carData.car.id,
        price_per_day: carData.price_per_day,
        start_date: findStartDate(carData),
        return_date: "",
        discount: 0,
        reasonForDiscount: ""
    })
    const handleInput = (event) => {
        const { name, value } = event.target;
        setExtendRentData({
            ...extendRentData,
            [name]: value
        });
    };

    function calculateTotalPrice(){
        if(!carData.extended_rent && extendRentData.return_date !== ""){
            return formatPrice((extendRentData.price_per_day - (extendRentData.price_per_day * (extendRentData.discount / 100))) * dayjs(extendRentData.return_date).diff(dayjs(extendRentData.start_date), 'day'));
        }
    }

    function findStartDate(data){
        let startDate = "";
        if(carData.extended_rents?.length > 0){
            startDate = carData.extended_rents[carData.extended_rents.length-1].return_date;
        }
        else{
            startDate = carData.return_date;
        } 
        return dayjs(startDate, "DD/MM/YYYY").add(1, 'day').format("YYYY-MM-DD")
    }

    const extendRent = () => {
        let errors = FormValidation.validateInputFields({"returnDate": extendRentData.return_date});
        if(extendRentData.discount > 0 && extendRentData.reasonForDiscount === ""){
            errors.push("You must fill reason for discount")
        }
        
        if(extendRentData.discount > 100 || extendRentData.discount < 0){
            errors.push("Discount must be in range of 0 to 100")
        }

        if(extendRentData.reasonForDiscount !== "" && extendRentData.discount === 0){
            errors.push("You must fill the discount")
        }

        if(errors.length !== 0){
            setMistakes(errors);
            return ;
        }
        // start date is generate on the backend
        delete extendRentData.start_date;
        carService.extendRent(extendRentData)
            .then(data =>{
                dispatch(refreshStatFirstPage());
                dispatch(refreshFirstPage());
                setReturnedCar(data);
            })
            .catch(errors =>{
                setMistakes([errors.message]);
            })
    };
    
    return (
        <div className="extend-modal z-3">
            {mistakes?.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error?.message || error}</div>
                    ))}
                </div>
            )}
            {returnedCar && <div className="alert alert-success" role="alert">{returnedCar.message}</div>}
            <div className="card">
                <div className="card-header">
                    <h5>License: {carData?.car?.license}</h5>
                </div>
                <div className="card-body">
                    <table className='table table-bordered '>
                        <thead className='table-dark'>
                            <tr>
                                <td>Start date</td>
                                <td>End rent</td>
                                <td>Days Total</td>
                                <td>Price per day</td> 
                                <td>Discount</td> 
                                <td>Reason for discount</td> 
                                <td>Total price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> 
                                    {dayjs(extendRentData.start_date).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                    <input 
                                        className='form-control'
                                        type="date" 
                                        name='return_date'
                                        id='return_date'
                                        value={extendRentData.return_date}
                                        onChange={handleInput}
                                        min={extendRentData.start_date}
                                    />
                                </td>
                                <td>
                                    {extendRentData.return_date ? 
                                    dayjs(extendRentData.return_date).diff(dayjs(extendRentData.start_date), 'day') : ""}
                                </td>
                                <td>{extendRentData.price_per_day}</td>
                                <td>
                                    <div className="input-group" style={{width: "110px"}}>
                                        <input 
                                            className='form-control'
                                            type="number"
                                            id='discount'
                                            name='discount'
                                            max={100}
                                            value={extendRentData.discount}
                                            onChange={handleInput}
                                        />
                                        <span className='input-group-text'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                                                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                            </svg>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <textarea
                                        className='form-control' 
                                        type="reasonForDiscount"
                                        name='reasonForDiscount'
                                        id='reasonForDiscount'
                                        value={extendRentData.reasonForDiscount}
                                        onChange={handleInput}
                                    />
                                </td>
                                <td className='fw-bold'>
                                    {calculateTotalPrice()}$
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button
                        onClick={() => closeModal(false)}
                        className="btn btn-outline-primary">Close modal</button>
                    <button className="btn btn-primary ml-auto" onClick={extendRent}>
                        Extend rent
                    </button>
                </div>
            </div>


        </div>
    );
}

export default ExtendRentModal;