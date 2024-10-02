import React, {useEffect, useState} from 'react';
import "../css/car-colors.css"
import CarStatus from '../enums/CarStatus';

function EditDeleteTable({cars, openDeleteModal}) {
    let carStatus = new CarStatus();
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <td>Status</td>
                    <td>License</td>
                    <td>Brand</td>
                    <td>Model</td>
                    <td>Edit car</td>
                    <td>Delete car</td>
                </tr>
                </thead>
                <tbody>
                {cars.map((car, index) => (
                    <tr key={index}>
                        <td><span className={'d-inline-block m-auto car-badge car-'+ car.status}>{car.status}</span></td>
                        <td>{car.license}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>
                            {car.status !== carStatus.deleted ? 
                                <button
                                    onClick={(event) => {
                                        // handleEditCar(event);
                                    }}
                                    name={car.license}
                                    className="btn btn-warning"
                                >
                                    Edit car
                                </button> : "" 
                            }
                        </td>
                        <td>
                            {car.status !== carStatus.rented ?
                                <button
                                    onClick={event => openDeleteModal(event) }
                                    name={car.license}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button> : ""
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}

export default EditDeleteTable;