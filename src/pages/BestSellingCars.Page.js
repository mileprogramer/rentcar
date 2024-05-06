import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.Component";
import carService from "../services/carService";

function BestSellingCars(props) {

    const [cars, setBestSellingCars] = useState([]);

    useEffect(() => {
        async function fetchBestSellingCars(){
            let cars = await carService.bestSellingCars(3);
            setBestSellingCars(cars);
        }

        fetchBestSellingCars();
    }, []);

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center gap-3">
                {
                    cars.map((car, index)=> {
                        return <div key={index} className="card col-3">
                            <div className="card-header">
                                License: {car.license}
                            </div>
                            <div className="car-body">
                                Brand: {car.brand}<br/>
                                Model: {car.model}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        </>
    );
}

export default BestSellingCars;