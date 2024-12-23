import { useAuth } from "../context/AuthContext";
import "../css/car-colors.css"
import CarStatus from '../enums/CarStatus';
import dayjs from 'dayjs';

function EditDeleteTable({cars, openDeleteModal, openEditModal}) {
    let carStatus = new CarStatus();
    const {isAdminSuperAdmin} = useAuth();

    return (
        <div className="table-container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <td>Status</td>
                    <td>License</td>
                    <td>Brand</td>
                    <td>Model</td>
                    <td>Last time edited</td>
                    <td>Edit car</td>
                    { isAdminSuperAdmin() ? <td>Delete car</td> : null } 
                </tr>
                </thead>
                <tbody>
                {cars.map((car, index) => (
                    <tr key={index}>
                        <td><span className={'d-inline-block m-auto car-badge car-'+ car.status}>{car.status}</span></td>
                        <td>{car.license}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{ car.last_time_updated !== null ? dayjs(car.last_time_updated).format("DD/MM/YYYY") : "" }</td>
                        <td>
                            {car.status !== carStatus.deleted ? 
                                <button
                                    onClick={(event) => {
                                        openEditModal(event);
                                    }}
                                    name={car.license}
                                    className="btn btn-warning"
                                >
                                    Edit car
                                </button> : "" 
                            }
                        </td>
                        <td>
                            {isAdminSuperAdmin() && car.status !== carStatus.rented && car.status !== carStatus.deleted ?
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

        </div>
    );
}

export default EditDeleteTable;