import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.Component'
import Spinner from "../components/Spinner.Component"
import carService from '../services/carService'
import LatestRentedCars from '../components/LatestRentedCars.Component'
import LatestReturnedCars from '../components/LatestReturnedCars.Component'

export default function HomePage() {

    const [numberOfRentedCarsMonth, setNumberOfRentedCarsMonth] = useState(-1); 
    const [numberOfReturnedCarsMonth, setNumberOfReturnedCarsMonth] = useState(-1); 
    const [numAvailableCars, setNumAvailableCars] = useState(-1);
    const [numRentedCars, setNumRentCars] = useState(-1);
    const [latestRentedCars, setLatestRentedCars] = useState([]);
    const [latestReturnedCars, setLatestReturnedCars] = useState([]);

    useEffect(()=> {

        carService.getNumberOfAvaialableCars()
            .then(response => setNumAvailableCars(response.data.total_cars))
            .catch(error => alert('Failed to fetch available cars: ' + (error?.message || error)));

        carService.getNumberOfRentedCars()
            .then(response => setNumRentCars(response.data.total_cars))
            .catch(error => alert('Failed to fetch rented cars: ' + (error?.message || error)));

        carService.getNumOfReturnedCarsMonth()
            .then(response => setNumberOfReturnedCarsMonth(response.data.total_cars))
            .catch(error => alert('Failed to fetch returned cars for the month: ' + (error?.message || error)));

        carService.getNumOfRentedCarsMonth()
            .then(response => setNumberOfRentedCarsMonth(response.data.total_cars))
            .catch(error => alert('Failed to fetch rented cars for the month: ' + (error?.message || error)));

        carService.getLatestRentedCars()
            .then(response => setLatestRentedCars(response.data))
            .catch(error => alert('Failed to fetch latest rented cars: ' + (error?.message || error)));

        carService.getLatestReturnedCars()
            .then(response => setLatestReturnedCars(response.data))
            .catch(error => alert('Failed to fetch latest returned cars: ' + (error?.message || error)));


    }, [])

    
    return (
    <div className='container'>
        <Navbar />
        <div className='d-flex gap-3 mt-5'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='display-6'>Number of rented cars this month: 
                        {numberOfRentedCarsMonth === -1 ?
                        <Spinner /> :
                        <span className='fw-bold'>{ numberOfRentedCarsMonth }</span>}
                        
                    </h3>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-primary'>Rent a car</button>
                </div>
            </div>
            
            <div className='card'>
                <div className='card-body'>
                    <h3 className='display-6'>Number of returned cars this month: 
                        {numberOfReturnedCarsMonth === -1 ? <Spinner /> :
                        <span className='fw-bold'>{numberOfReturnedCarsMonth}</span>}
                    </h3>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-primary'>Return a car</button>
                </div>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <h3 className='display-6'>Number of available cars: 
                        {numAvailableCars === -1 ? <Spinner /> : 
                        <span className='fw-bold'>{ numAvailableCars }</span>}
                    </h3>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-primary'>See available cars</button>
                </div>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <h3 className='display-6'>Number of rented cars: 
                        {numRentedCars === -1 ? <Spinner /> : 
                        <span className='fw-bold'>{ numRentedCars }</span>}
                    </h3>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-primary'>See rented cars</button>
                </div>
            </div>
        </div>     
        <LatestRentedCars latestRentedCars={latestRentedCars} />
        <LatestReturnedCars latestReturnedCars = {latestReturnedCars} />
    </div>
    )
}
