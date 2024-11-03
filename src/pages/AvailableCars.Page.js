import React, { useRef, useState } from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";
import Pagination from "../components/Pagination.Component";
import DefaultTable from '../components/DefaultTable.Component';
import Mistakes from "../components/MistakesAlert.Component";
import { useQuery } from '@tanstack/react-query';

function AvailableCars(props) {

    const [isSearched, setIsSearched] = useState(false);
    const searchTerm = useRef("");
    const [modalRentCar, setModalRentCar] = useState(false);
    const [isActiveOverlay, setActiveOverlay] = useState(false);
    const [rentedCarData, setRentedCarData] = useState({});

    const fetchCars = async (page) => {
        if (isSearched) {
            const response = await carService.searchAvailableCars(searchTerm.current, page);
            return response;
        } else {
            const response = await carService.getAvailableCars(page);
            return response;
        }
    };

    const { data, error, isError, isLoading, refetch } = useQuery({
        queryKey: ['availableCars', searchTerm.current, isSearched],
        queryFn: ({ queryKey }) => fetchCars(queryKey[1]),
        keepPreviousData: true,
        staleTime: 30000,
    });

    const totalElements = data?.paginationData?.totalElements || 0;
    const elementsPerPage = data?.paginationData?.elementsPerPage || 10;

    const searchCars = (term) => {
        searchTerm.current = term;
        setIsSearched(true);
        refetch();
    };

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
        setActiveOverlay(true);
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
                        elementsPerPage={elementsPerPage}
                        totalElements={totalElements}
                        changePage={(page) => refetch({ page })}
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
                    setActiveOverlay={setActiveOverlay}
                />

            </div>
        </div>
    );
}

export default AvailableCars;