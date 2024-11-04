import React, { useState } from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";
import Pagination from "../components/Pagination.Component";
import DefaultTable from '../components/DefaultTable.Component';
import Mistakes from "../components/MistakesAlert.Component";
import useFetchAvailableCars from '../hooks/useFetchAvailableCars';

function AvailableCars(props) {
    
    const [modalRentCar, setModalRentCar] = useState(false);
    const [rentedCarData, setRentedCarData] = useState({});
    const { 
        data, 
        isError, 
        error,
        isLoading, 
        searchCars, 
        changePage,
        setIsSearched
    } = useFetchAvailableCars();

    const renderTableRow = (car) => {
        if(car) {
            return <>
                <td>{car.license}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.air_conditioning_type}</td>
                <td>{car.person_fit_in}</td>
                <td>{car.car_consumption}l/100km</td>
                <td>{car.transmission_type}</td>
                <td>
                    <button
                        onClick={() => openRentCarModal(car.license)}
                        className="btn btn-primary"
                    >
                        Rent car
                    </button>
                </td>
            </>
        }
    }

    const openRentCarModal = (license) => {
        setRentedCarData(() =>  data.cars.find(car => car.license === license));
        setModalRentCar(true);
    }

    const renderLoaderOrCarsTable = () => {
        if (isLoading) {
            return <Loader />;
        } 
        else if (isError) {
            <Mistakes mistakes = {error}  /> 
        } 
        else {
            return (
                <>
                    <DefaultTable
                        data={data.cars}
                        columns={["License", "Brand", "Model", "Years old", "Air Conditioner", "Person fit in", "Car consumption in city", "Transmissions type", "Reservation"]}
                        renderRow={renderTableRow}
                    />
                    <Pagination 
                        elementsPerPage={data.paginationData.elementsPerPage}
                        totalElements={data.paginationData.totalElements}
                        changePage={(page) => changePage(page)}
                        currentPage={data.paginationData.currentPage}
                    />
                </>

            );
        }
    };

    return (
        <div className='position-relative overflow-hidden'>
            <div className="container">
                <Navbar/>
                <div className="ml-auto">
                    <Search 
                        setIsSearched={setIsSearched}
                        getCarData={searchCars}
                        placeholder={"Type license, brand, model of car"}
                    />
                </div>
                {renderLoaderOrCarsTable()}
                <RentCar 
                    setModalRentCar = {setModalRentCar}
                    modalRentCar = {modalRentCar}
                    carData = {rentedCarData}
                />

            </div>
        </div>
    );
}

export default AvailableCars;