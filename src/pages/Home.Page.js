import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Sort from "../components/Sort.Component";
import CarsTable from "../components/CarsTable.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";

function HomePage(props) {
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [modalCar, setModalCar] = useState({});


    useEffect( () => {
        let fetchCars = async ()=>{
            let carsData = await carService.getCars();
            setCars(carsData);
            setLoader(false);
        }
        fetchCars();
    }, []);
    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                <Search setCars={setCars}/>
                <Sort setCars={setCars}/>
            </div>
            {loader ? <Loader/> : <CarsTable cars={cars} setRentCarModal = {setModalRentCar} setModalCar = {setModalCar} />}
            <RentCar setModalRentCar = {setModalRentCar} modalRentCar = {modalRentCar} car={modalCar}/>
        </div>
    );
}

export default HomePage;