import React, {useState} from 'react';
import "../css/table.css"
import ModalOverlay from "./ModalOverlay.Component";


function CarsTable({cars, setRentCarModal, getCarData, setActiveOverlay}) {

    const openRentCarModal = (event)=>{
        setActiveOverlay(true);
        getCarData(event.target.name);
        setRentCarModal(true);
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
                <td>Return day</td>
                <td>Average rating</td>
                <td>Available</td>
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
                        {car.airConditioner ?
                            <td>
                                <button className="btn btn-success">Yes</button>
                            </td> :
                            <td>
                                <button className="btn btn-danger">No</button>
                            </td>
                        }
                        <td>{car.pricePerDay}</td>
                        <td>{car.returnDate ? car.returnDate : "---"}</td>
                        <td>{car.averageRating.toFixed(2)}</td>
                        {isAvailable(car)}
                    </tr>)
                })
            }
            </tbody>
        </table>
        </>
    );
}

export default CarsTable;