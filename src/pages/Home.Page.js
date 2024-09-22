import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Sort from "../components/Sort.Component";
import CarsTable from "../components/CarsTable.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";
import Pagination from "../components/Pagination.Component";
import ModalOverlay from "../components/ModalOverlay.Component";
import { useDispatch, useSelector } from 'react-redux';
import { selectCars } from '../redux/car.slicer';
import { saveCars } from '../redux/car.slicer';
import { setCurrentPage } from '../redux/car.slicer';
import { selectCurrentPage } from '../redux/car.slicer';

function HomePage(props) {
    const currentPage = useSelector((state) => selectCurrentPage(state));
    const cars = useSelector((state) => selectCars(state, currentPage));
    const dispatch = useDispatch();

    const [paginateData, setPaginateData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);
    const [isActiveOverlay, setActiveOverlay] = useState(false);
    const [rentedCarLicense, setRentedCarLicense] = useState("");

    if(cars === null)
        getCars(currentPage);

    function getCars(page = 1){
        carService.getCars(page)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : page}));
                dispatch(saveCars({"page": page, "cars": data.cars}));
                setPaginateData(data.paginationData);
                setLoader(false);
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
        if (loader || cars === null) {
            return <Loader />;
        } else if (mistakesAPI !== null) {
            return <div className="alert alert-danger">{mistakesAPI.message}</div>;
        } else {
            
            return (
                <>
                    {
                        isActiveOverlay && <ModalOverlay setModalRentCar={(showOrHide) => setModalRentCar(showOrHide)} setActiveOverlay = {(showOrHide) => setActiveOverlay(showOrHide)} />
                    }
                    <CarsTable
                        cars={cars}
                        setRentCarModal={openRentCarModal}
                        paginateData={paginateData}
                        openRentCarModal={openRentCarModal}
                    />
                    <Pagination elementsPerPage={paginateData.elementsPerPage}
                                totalElements={paginateData.totalElements}
                                changePage={(page) => dispatch(setCurrentPage({page}))}
                                currentPage={currentPage}/>
                </>

            );
        }
    };

    // const handleCarRented = (rentedCar) =>{
    //     setCars(cars.map((car)=>{
    //         if(car.license === rentedCar.license){
    //             car.available = false;
    //             car.returnDate = rentedCar.returnDate;
    //         }
    //         return car;
    //     }))
    // }

    // const search = (data) =>{
    //     // function called by search btn
    //     setCars(data.cars);
    //     setPaginateData(data.paginateData);
    // }

    // const getCarData = (license) =>{
    //     setCarData(cars.find(car =>{
    //         return car.license === license;
    //     }));
    // }

    // const resetSearch = () =>{
    //     // function called by search btn
    //     getCars(1);
    // }

    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                {/* <Search resetSearch={resetSearch} setLoader = {setLoader} search ={search}/>
                <Sort setCars={setCars} setLoader = {setLoader}/> */}
            </div>
            {renderLoaderOrCarsTable()}
            {modalRentCar !== false ? <RentCar setModalRentCar = {setModalRentCar}
                                      modalRentCar = {modalRentCar}
                                      carLicense = {rentedCarLicense}
                                      carFromPage = {currentPage}
                                      setActiveOverlay={setActiveOverlay}
            /> : "" }

        </div>
    );
}

export default HomePage;