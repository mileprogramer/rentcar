import React, {useEffect, useState} from 'react';
import Loader from "./Loader.Component";
import carService from "../services/carService";

function EditDeleteTable({setDeleteCarModal, setDataDeleteModal, setEditCarModal, setDataEditModal ,cars, loader}) {

    const handleDeleteCar = async (event) => {
        setDeleteCarModal(true);
        try{
            let car = await carService.getCar(null,event.target.name);
            setDataDeleteModal(car);
        }catch (error){
            alert(error);
        }
    }

    const handleEditCar = async (event) => {
        console.log("radi handleEditCar");
        setEditCarModal(true);
        try{
            let car = await carService.getCar(null,event.target.name);
            setDataEditModal(car);
        }catch (error){
            alert(error);
        }
    }

    return (
        <>
            {loader === false ? (
                <Loader/>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <td>License</td>
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
                    {cars.map((car, index) => (
                        <tr key={index}>
                            <td>{car.license}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.quantity}</td>
                            <td>
                                {car.airConditioner ? (
                                    <button className="btn btn-success">Yes</button>
                                ) : (
                                    <button className="btn btn-danger">No</button>
                                )}
                            </td>
                            <td>{car.pricePerDay}</td>
                            <td>
                                <button
                                    onClick={(event) => {
                                        handleEditCar(event);
                                    }}
                                    name={car.license}
                                    className="btn btn-warning"
                                >
                                    Edit car
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={(event) => {
                                        handleDeleteCar(event);
                                    }}
                                    name={car.license}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default EditDeleteTable;