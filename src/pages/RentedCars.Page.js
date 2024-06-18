import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Loader from "../components/Loader.Component";
import RentedCarsTable from "../components/RentedCarsTable.Component";
import AcceptCarModalComponent from "../components/AcceptCarModal.Component";


let allCars = [];
function RentedCars(props) {
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);
    const [acceptModal, setAcceptModal] = useState(false);
    const [carData, setCarData] = useState({});


    useEffect( () => {
        setLoader(true);
        carService.getRentedCars()
            .then((cars)=>{
                setCars(cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakesAPI(error);
            })
    }, []);



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

    const resetSearch = () =>{
        // function called by search btn
        setCars(allCars);
        allCars = [];
        setIsSearched(false);
    }

    const handleAccept = (license) =>{
        setCars(cars.filter(car => {
            return car.license !== license;
        }));
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                <Search resetSearch={resetSearch} setLoader = {setLoader} search ={search}/>
            </div>
            <h1>Rented Cars</h1>
            {
                cars.length  > 0 ? <RentedCarsTable cars={cars} setAcceptModal={setAcceptModal} setCarData = {setCarData}/> :
                    <div className="alert alert-warning">There is not rented cars</div>
            }
            {
                acceptModal && <AcceptCarModalComponent car = {carData} setAcceptModal = {setAcceptModal} setAcceptCar={handleAccept}/>
            }
        </div>
    );
}

export default RentedCars;