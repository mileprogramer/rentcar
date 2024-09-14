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

let allCars = [];
function HomePage(props) {
    const [cars, setCars] = useState([]);
    const [paginateData, setPaginateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [carData, setCarData] = useState({});
    const [isSearched, setIsSearched] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);
    const [isActiveOverlay, setActiveOverlay] = useState(false);


    useEffect( () => {
        getCars();
    }, []);

    function getCars(page = 1){
        setLoader(true);
        carService.getCars(page)
            .then((data)=>{
                setPaginateData(data.paginationData);
                setCars(data.cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakesAPI(error);
            })
    }

    const renderLoaderOrCarsTable = () => {
        if (loader) {
            return <Loader />;
        } else if (mistakesAPI !== null) {
            return <div className="alert alert-danger">{mistakesAPI.message}</div>;
        } else {
            return (
                <>
                    {
                        isActiveOverlay && <ModalOverlay isActive = {isActiveOverlay} setActive = {setActiveOverlay} />
                    }
                    <CarsTable
                        cars={cars}
                        setRentCarModal={setModalRentCar}
                        getCarData={getCarData}
                        paginateData={paginateData}
                        setActiveOverlay={setActiveOverlay}
                    />
                    <Pagination elementsPerPage={paginateData.elementsPerPage}
                                totalElements={paginateData.totalCars}
                                setCurrentPage={setCurrentPage}
                                currentPage={paginateData.currentPage}
                                getData={getCars}/>
                </>

            );
        }
    };

    const handleCarRented = (rentedCar) =>{
        setCars(cars.map((car)=>{
            if(car.license === rentedCar.license){
                car.available = false;
                car.returnDate = rentedCar.returnDate;
            }
            return car;
        }))
    }

    const search = (data) =>{
        // function called by search btn
        setCars(data.cars);
        setPaginateData(data.paginateData);
    }

    const getCarData = (license) =>{
        setCarData(cars.find(car =>{
            return car.license === license;
        }));
    }

    const resetSearch = () =>{
        // function called by search btn
        getCars(1);
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                <Search resetSearch={resetSearch} setLoader = {setLoader} search ={search}/>
                <Sort setCars={setCars} setLoader = {setLoader}/>
            </div>
            {renderLoaderOrCarsTable()}
            {modalRentCar !== false ? <RentCar setModalRentCar = {setModalRentCar}
                                      modalRentCar = {modalRentCar}
                                      car={carData}
                                      setCars = {handleCarRented}
                                      setActiveOverlay={setActiveOverlay}
            /> : "" }

        </div>
    );
}

export default HomePage;