import { useEffect, useState } from "react";
import "../css/table.css";
import "../css/car-colors.css";


function CarsTable({cars, openRentCarModal}) {

    const getCarStatus = (car) => {
        if (car.available === true) {
            return (
                <>
                    <td>
                        <div className={"car-badge car-" + car.color}>{ car.status }</div>
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
                    <div className={"car-badge car-" + car.color}> {car.status} </div>
                </td>
                <td> {null} </td>
            </>
        )
    }

    return (
        <>
        <table className="table">
            <thead>
            <tr>
                <td>License</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Years old</td>
                <td>Air Conditioner</td>
                <td>Prize per day</td>
                <td>Possible return day</td>
                <td>Status</td>
                <td>Reservation</td>
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
                        <td>{car.air_conditioning_type}</td>
                        <td>{car.price_per_day}</td>
                        <td>{car.returned_date ? car.returned_date : "---"}</td>
                        {getCarStatus(car)}
                    </tr>)
                })
            }
            </tbody>
        </table>
        </>
    );
}

export default CarsTable;