import React from 'react';

function RentedCarsTable({cars, setAcceptModal, setCarData}) {

    const handleAcceptCar = (event)=>{
        setAcceptModal(true);
        setCarData(cars.find(car => car.license === event.target.name));
    }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <td>License</td>
                    <td>Personal Data</td>
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
                            <td>{rentedCar.license}</td>
                            <td>{rentedCar.personalData}</td>
                            <td>{rentedCar.idCard}</td>
                            <td>{rentedCar.startDate}</td>
                            <td>{rentedCar.returnDate}</td>
                            <td>{rentedCar.pricePerDay}</td>
                            <td><button
                                name={rentedCar.license}
                                className="btn btn-dark"
                                onClick={handleAcceptCar}> Accept Car </button></td>
                            <td><button className="btn btn-primary"> Extend rent </button></td>

                        </tr>)
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default RentedCarsTable;