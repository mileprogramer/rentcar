import React from 'react';

function RentedCarsTable({cars, openAcceptCarModal}) {

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
                    <td>Extended rent</td>
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
                            <td>{rentedCar.extended_rents.length === 0 ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg> 
                            }</td>
                            <td>
                                <button
                                    className="btn btn-dark"
                                    onClick={(event) => openAcceptCarModal(event.target.name)}
                                    name={rentedCar.car.license}
                                > Accept Car </button>
                            </td>
                            <td>
                                <button
                                    // onClick={handleEditRent}
                                    name={rentedCar.license}
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