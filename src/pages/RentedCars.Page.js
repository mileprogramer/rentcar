import React, {useEffect, useRef, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import Loader from "../components/Loader.Component";
import RentedCarsTable from "../components/RentedCarsTable.Component";
import AcceptCarModalComponent from "../components/AcceptCarModal.Component";
import EditRent from "../components/EditRent.Component";
import SearchRented from "../components/SearchRented.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveCars, savePaginationData, selectCars, selectCurrentPage, selectPaginationData, selectShouldFetchNextPage, setCurrentPage } from '../redux/rentedCars.slicer';
import Pagination from '../components/Pagination.Component';
import ModalOverlay from '../components/ModalOverlay.Component';

function RentedCars(props) {

    const currentPage = useSelector((state) => selectCurrentPage(state));
    const cars = useSelector((state) => selectCars(state, currentPage));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const shouldFetchNextPage = useSelector((state) => selectShouldFetchNextPage(state));
    const carData = useRef({});
    const dispatch = useDispatch();
    const [overlay, setActiveOverlay] = useState(true);
    const [loader, setLoader] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const [mistakes, setMistakes] = useState(null);
    const [acceptModal, setAcceptModal] = useState(false);
    const [rentModal, setRentModal] = useState(false);
    
    if(cars === null){
        getRentedCars(currentPage);
    }
    
    if(shouldFetchNextPage){
        // FETCHING next page of cars for better UX and getting the next available car
        let nextPage = currentPage + 1;
        carService.getRentedCars()
            .then((data)=>{
                dispatch(saveCars({"page": nextPage, "cars": data.cars}));
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    function getRentedCars(page = 1){
        carService.getRentedCars()
            .then((data)=>{
                dispatch(setCurrentPage({"page" : page}));
                dispatch(saveCars({"page": page, "cars": data.cars}));
                dispatch(savePaginationData({"paginationData" : data.paginationData}));
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakes(error);
            })
    }

    return (
    <div className='position-relative' style={{height: "100vh"}}>
            <div className="container">
                <Navbar/>
                {/* <div className="d-flex gap-3 my-5">
                    <SearchRented resetSearch={resetSearch} setLoader = {setLoader} search = {search}/>
                </div> */}
                <h4>Rented Cars</h4>
                {
                    cars?.length  > 0 ? 
                        <>
                            <RentedCarsTable cars={cars}
                                setRentModal={setRentModal}
                                openAcceptCarModal = {license => {
                                    carData.current = cars.find(car => car.car.license === license);
                                    setAcceptModal(true);
                                }} /> 
                            <Pagination elementsPerPage={paginationData.elementsPerPage}
                                totalElements={paginationData.totalElements}
                                changePage={(page) => dispatch(setCurrentPage({page}))}
                                currentPage={currentPage}/>
                        </>
                        : <Loader/>
                }
                {
                    acceptModal && <>
                        <AcceptCarModalComponent 
                            currentPage={currentPage}
                            carData = {carData.current}
                            closeModal = {(showOrHide) => setAcceptModal(showOrHide)}/>
                        <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={(showOrHide) => setAcceptModal(showOrHide)}/>
                        </> 
                }
                {/* {
                    rentModal && <EditRent rentedCarData={carData}
                                            setRentModal = {setRentModal}
                                            setRentCar ={handleEditRent}/>
                } */}
            </div>
        </div>
    );
}

export default RentedCars;