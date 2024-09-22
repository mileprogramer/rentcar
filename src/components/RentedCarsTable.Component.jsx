import React from 'react';

function RentedCarsTable({cars, setAcceptModal, setCarData, setRentModal, setRentData}) {

    const handleAcceptCar = (event)=>{
        setCarData(cars.find(car => car.license === event.target.name));
        setAcceptModal(true);
    }

    const handleEditRent = (event)=>{
        setCarData(cars.find(car => car.license === event.target.name));
        setRentModal(true);
    }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <td>License</td>
                    <td>Personal Data</td>
                    <td>Phone number</td>
                    <td>Id card user</td>
                    <td>Start rent date</td>
                    <td>End rent date</td>
                    <td>Price per day</td>
                    <td>See details</td>
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
                                name={rentedCar.license}
                                className="btn btn-info"
                                onClick={handleAcceptCar}> See details </button>
                            </td>
                            <td>
                                <button
                                name={rentedCar.license}
                                className="btn btn-dark"
                                onClick={handleAcceptCar}> Accept Car </button>
                            </td>
                            <td>
                                <button
                                onClick={handleEditRent}
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