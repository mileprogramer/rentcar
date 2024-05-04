import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Loader from "./Loader.Component";

import "../css/table.css"

function CarsTable(props) {

    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect( () => {
        let fetchCars = async ()=>{
            let carsData = await carService.getCars();
            setCars(carsData);
            setLoader(true);
        }
        fetchCars();
    }, []);

    const isAvailable = (car) =>{
        if(car.available === true){
            console.log("radi");
            return (
                <>
                    <td> <button className="btn btn-success">Yes</button> </td>
                    <td> {""} </td>
                    <td> <button className="btn btn-primary">Rent a car</button> </td>
                </>
            )
        }
        return (
            <>
            <td> <button className="btn btn-danger">No</button> </td>
                <td> {car.returnDate} </td>
                <td>  </td>
            </>
        )
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <td>Number of car</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Years old</td>
                <td>Air Conditioner</td>
                <td>Prize per day</td>
                <td>Available</td>
                <td>Rental Return Date</td>
                <td> Reservation</td>
            </tr>
            </thead>
            <tbody>
            {loader === false ? <Loader/> :
                cars.map((car, index)=> {
                    return (<tr key={index} >
                        <td>{index}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        {car.airConditioner ?
                            <td>
                                <button className="btn btn-success">Yes</button>
                            </td> :
                            <td>
                                <button className="btn btn-danger">Yes</button>
                            </td>
                        }
                        <td>{car.pricePerDay}</td>
                        {isAvailable(car)}
                    </tr>)
                })}
            </tbody>
        </table>
    );
}

export default CarsTable;