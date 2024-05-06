import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Loader from "./Loader.Component";

import "../css/table.css"


function CarsTable({cars, setRentCarModal, setModalCar}) {

    const openRentCarModal = async (event)=>{
        setRentCarModal(true);
        let car = await carService.find(event.target.name);
        setModalCar(car);
    }


    const isAvailable = (car) => {
        if (car.available === true) {
            return (
                <>
                    <td>
                        <button className="btn btn-success">Yes</button>
                    </td>
                    <td>
                        <input onClick={(event)=>openRentCarModal(event)}
                               type="button"
                               value="Rent car"
                               name={car.license}
                               className="btn btn-primary"/>
                    </td>
                </>
            )
        }
        return (
            <>
                <td>
                    <button className="btn btn-danger">No</button>
                </td>
                <td>{null}</td>
            </>
        )
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <td>License</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Years old</td>
                <td>Air Conditioner</td>
                <td>Prize per day</td>
                <td>Available</td>
                <td> Reservation</td>
            </tr>
            </thead>
            <tbody>
            {
                cars.map((car, index) => {
                    return (<tr key={index}>
                        <td>{car.license}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        {car.airConditioner ?
                            <td>
                                <button className="btn btn-success">Yes</button>
                            </td> :
                            <td>
                                <button className="btn btn-danger">No</button>
                            </td>
                        }
                        <td>{car.pricePerDay}</td>
                        {isAvailable(car)}
                    </tr>)
                })
            }
            </tbody>
        </table>
    );
}

export default CarsTable;