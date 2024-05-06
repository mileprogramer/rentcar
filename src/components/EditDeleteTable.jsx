import React, {useEffect, useState} from 'react';
import Loader from "./Loader.Component";
import carService from "../services/carService";

function EditDeleteTable(props) {
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect( () => {
        let fetchCars = async ()=>{
            let carsData = await carService.getCars();
            setCars(carsData);
            setLoader(true);
        }
        fetchCars();
    }, [cars]);

    const handleDeleteCar = (event)=>{
        // go to the db
        // find a car
        // insert car into prompt


    }

    return (
        <table className="table">
            <thead>
            <tr>
                <td>Number of car</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Years old</td>
                <td>Quantity</td>
                <td>Air Conditioner</td>
                <td>Prize per day</td>
                <td>Edit car</td>
                <td>Delete car</td>
            </tr>
            </thead>
            <tbody>
            {loader === false ? <Loader/> :
                cars.map((car, index) => {
                    return (<tr key={index}>
                        <td>{index}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.quantity}</td>
                        {car.airConditioner ?
                            <td>
                                <button className="btn btn-success">Yes</button>
                            </td> :
                            <td>
                                <button className="btn btn-danger">No</button>
                            </td>
                        }
                        <td>{car.pricePerDay}</td>
                        <td> <button className="btn btn-warning"> Edit </button> </td>
                        <td> <button onClick={(event)=>{handleDeleteCar(event)}} className="btn btn-danger"> Delete </button> </td>
                    </tr>)
                })}
            </tbody>
        </table>
    );
}

export default EditDeleteTable;