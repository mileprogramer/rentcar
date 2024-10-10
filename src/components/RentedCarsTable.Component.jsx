import React from 'react';

function RentedCarsTable({cars, openAcceptCarModal, openExtendRentModal}) {

    if(cars.length === 0){
        return "There is not rented cars";
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td>License</td>
                    <td>Personal Data</td>
                    <td>Phone number</td>
                    <td>Id card user</td>
                    <td>Start rent date</td>
                    <td>End rent date</td>
                    <td>Price per day</td>
                    <td>Accept car</td>
                    <td>Extend rent</td>
                </tr>
                </thead>
                <tbody>
                {
                    cars.map((rentedCar, index) => {
                        return (<tr key={index}>
                            <td>{rentedCar.car['license']}</td>
                            <td>{rentedCar.user['name']}</td>
                            <td>{rentedCar.user['card_id']}</td>
                            <td>{rentedCar.user['phone']}</td>
                            <td>{rentedCar.start_date}</td>
                            <td>{rentedCar.return_date}</td>
                            <td>{rentedCar.price_per_day}</td>
                            <td>
                                <button
                                    className="btn btn-dark"
                                    onClick={(event) => openAcceptCarModal(event.target.name)}
                                    name={rentedCar.car.license}
                                > Accept Car </button>
                            </td>
                            <td>
                                <button
                                    onClick={(event) => openExtendRentModal(event.target.name)}
                                    name={rentedCar.car.license}
                                    className="btn btn-primary"
                            > Extend rent </button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default RentedCarsTable;