import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Sort from "../components/Sort.Component";
import CarsTable from "../components/CarsTable.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";

let allCars = [];

function HomePage(props) {
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [carData, setCarData] = useState({});
    const [isSearched, setIsSearched] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);


    useEffect( () => {
        setLoader(true);
        carService.getCars()
            .then((cars)=>{
                setCars(cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakesAPI(error);
            })
    }, []);

    const handleCarRented = (rentedCar) =>{
        setCars(cars.map((car)=>{
            if(car.license === rentedCar.license){
                car.available = false;
                car.returnDate = rentedCar.returnDate;
            }
            return car;
        }))
    }

    const search = (searchedCars) =>{
        // function called by search btn
        if(isSearched){
            setCars(searchedCars);
        }
        else{
            setIsSearched(true);
            allCars = [...cars];
            setCars(searchedCars);
        }
    }

    const getCarData = (license) =>{
        setCarData(cars.find(car =>{
            return car.license === license;
        }));
    }

    const resetSearch = () =>{
        // function called by search btn
        setCars(allCars);
        allCars = [];
        setIsSearched(false);
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                <Search resetSearch={resetSearch} setLoader = {setLoader} search ={search}/>
                <Sort setCars={setCars} setLoader = {setLoader}/>
            </div>
            {loader ? <Loader/> : mistakesAPI === null ? <CarsTable cars={cars} setRentCarModal = {setModalRentCar} getCarData={getCarData}/> :
                <div className="alert alert-danger">{mistakesAPI}</div>}
            {modalRentCar !== false ? <RentCar setModalRentCar = {setModalRentCar}
                                      modalRentCar = {modalRentCar}
                                      car={carData}
                                      setCars = {handleCarRented}
            /> : "" }

        </div>
    );
}

export default HomePage;