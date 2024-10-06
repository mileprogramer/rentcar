import React, { useRef, useState } from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import CarsTable from "../components/CarsTable.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";
import Pagination from "../components/Pagination.Component";
import ModalOverlay from "../components/ModalOverlay.Component";
import { useDispatch, useSelector } from 'react-redux';
import { selectCars, selectPaginationData, selectCurrentPage, selectShouldFetchNextPage } from '../redux/car.slicer';
import { saveCars, savePaginationData, setCurrentPage } from '../redux/car.slicer';

function HomePage(props) {

    const [isSearched, setIsSearched] = useState(false);
    let typeIsSearched = isSearched ? "searched" : "";

    const currentPage = useSelector((state) => selectCurrentPage(state, typeIsSearched));
    const cars = useSelector((state) => selectCars(state, currentPage, typeIsSearched));
    const paginationData = useSelector((state) => selectPaginationData(state, typeIsSearched));
    const shouldFetchNextPage = useSelector((state) => selectShouldFetchNextPage(state));
    const dispatch = useDispatch();
    
    const searchTerm = useRef("");
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);
    const [isActiveOverlay, setActiveOverlay] = useState(false);
    const [rentedCarLicense, setRentedCarLicense] = useState("");
    
    if(isSearched === true && cars === null){
        carService.searchAvailableCars(searchTerm.current, currentPage)
            .then((data)=>{
                console.log(data.cars);
                dispatch(saveCars({"page": currentPage, "cars": data.cars, "type": "searched"}));
            })
            .catch((error)=>{
                setMistakesAPI(error);
            })
    }

    if(cars === null && isSearched === false){
        getCars(currentPage);
    }
    
    if(shouldFetchNextPage){
        // FETCHING next page of cars for better UX and getting the next available car
        let nextPage = currentPage + 1;
        carService.getAvailableCars(nextPage)
            .then((data)=>{
                dispatch(saveCars({"page": nextPage, "cars": data.cars}));
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    function getCars(page = 1){
        carService.getAvailableCars(page)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : page}));
                dispatch(saveCars({"page": page, "cars": data.cars}));
                dispatch(savePaginationData({"paginationData" : data.paginationData}));
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakesAPI(error);
            })
    }

    function searchCars(term){
        setLoader(true);
        searchTerm.current = term;
        carService.searchAvailableCars(term)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : 1, "type": "searched"}));
                dispatch(saveCars({"page": 1, "cars": data.cars, "type": "searched"}));
                dispatch(savePaginationData({"paginationData" : data.paginationData, "type": "searched"}));
                setLoader(false);
                setIsSearched(true);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakesAPI(error);
            })
    }

    const openRentCarModal = (event)=>{
        setActiveOverlay(true);
        setRentedCarLicense(event.target.name);
        setModalRentCar(true);
    }

    const renderLoaderOrCarsTable = () => {
        if (cars === null) {
            return <Loader />;
        } else if (mistakesAPI !== null) {
            return <div className="alert alert-danger">{mistakesAPI.message}</div>;
        } else {
            
            return (
                <>
                    {
                        isActiveOverlay && 
                        <ModalOverlay 
                            bgColor="transparent" 
                            setModalActive={(showOrHide) => setModalRentCar(showOrHide)} 
                            setActiveOverlay = {(showOrHide) => setActiveOverlay(showOrHide)} 
                        />
                    }
                    <CarsTable
                        cars={cars}
                        setIsSearched={setIsSearched}
                        setRentCarModal={openRentCarModal}
                        openRentCarModal={openRentCarModal}
                    />
                    <Pagination elementsPerPage={paginationData.elementsPerPage}
                                totalElements={paginationData.totalElements}
                                changePage={(page) => dispatch(setCurrentPage({page, "type": typeIsSearched}))}
                                currentPage={currentPage}/>
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
                        setLoader = {setLoader} 
                        placeholder={"Type license, brand, model of car"}
                    />
                </div>
                {renderLoaderOrCarsTable()}
                <RentCar setModalRentCar = {setModalRentCar}
                    modalRentCar = {modalRentCar}
                    carLicense = {rentedCarLicense}
                    carFromPage = {currentPage}
                    typeIsSearched={typeIsSearched}
                    setActiveOverlay={setActiveOverlay}
                />

            </div>
        </div>
    );
}

export default HomePage;