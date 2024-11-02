import React, { useRef, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import Loader from "../components/Loader.Component";
import AcceptCarModalComponent from "../components/AcceptCarModal.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveCars, savePaginationData, selectCars, selectCurrentPage, selectPaginationData, selectShouldFetchNextPage, setCurrentPage } from '../redux/rentedCars.slicer';
import Pagination from '../components/Pagination.Component';
import ModalOverlay from '../components/ModalOverlay.Component';
import Search from '../components/Search.Component';
import ExtendRentModal from '../components/ExtendRentModal.Component';
import DefaultTable from '../components/DefaultTable.Component';

function RentedCars(props) {

    const [isSearched, setIsSearched] = useState(false);
    let typeIsSearched = isSearched ? "searched" : "";

    const currentPage = useSelector((state) => selectCurrentPage(state, typeIsSearched));
    const cars = useSelector((state) => selectCars(state, currentPage, typeIsSearched));
    const paginationData = useSelector((state) => selectPaginationData(state, typeIsSearched));
    const shouldFetchNextPage = useSelector((state) => selectShouldFetchNextPage(state));
    const carData = useRef({});
    const searchTerm = useRef({});
    const dispatch = useDispatch();
    const [overlay, setActiveOverlay] = useState(true);
    const [loader, setLoader] = useState(true);
    const [mistakes, setMistakes] = useState(null);
    const [acceptModal, setAcceptModal] = useState(false);
    const [extendRentModal, setExtendRentModal] = useState(false);

    const findReturnDate = (rentedCar) => {
        if(rentedCar?.extended_rents?.length > 0){
            return rentedCar.extended_rents[rentedCar.extended_rents.length-1].return_date;
        }
        return rentedCar.return_date;
    }

    const renderTableRow = (rentedCar) => {
        
        if(rentedCar && rentedCar.car && rentedCar.extended_rents)
            return <>
                <td>{rentedCar.car['license']}</td>
                <td>{rentedCar.user['name']}</td>
                <td>{rentedCar.user['card_id']}</td>
                <td>{rentedCar.user['phone']}</td>
                <td>{rentedCar.start_date}</td>
                <td>{findReturnDate(rentedCar)}</td>
                <td>{rentedCar.price_per_day}</td>
                <td>
                    <button
                        className="btn btn-dark"
                        onClick={() => {
                            carData.current = cars.find(car => car.car.license === rentedCar.car.license);
                            console.log(carData.current, cars, rentedCar.car.license)
                            setAcceptModal(true);
                        }}
                    > Accept Car </button>
                </td>
                <td>
                    <button
                        onClick={(event) => {
                            carData.current = cars.find(car => car.car.license === rentedCar.car.license);
                            setExtendRentModal(true);
                        }}
                        className="btn btn-primary"
                > Extend rent </button>
                </td>
            </>
    }
    
    if(isSearched === true && cars === null){
        carService.searchRentedCars(searchTerm.current, currentPage)
            .then((data)=>{
                dispatch(saveCars({"page": currentPage, "cars": data.cars, "type": "searched"}));
            })
            .catch((error)=>{
                setMistakes(error);
            })
    }


    if(cars === null){
        getRentedCars(currentPage);
    }
    
    if(shouldFetchNextPage){
        // FETCHING next page of cars for better UX and getting the next available car
        let nextPage = currentPage + 1;
        carService.getRentedCars(nextPage)
            .then((data)=>{
                dispatch(saveCars({"page": nextPage, "cars": data.cars}));
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    function getRentedCars(page = 1){
        carService.getRentedCars(page)
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

    function searchCars(term){
        setLoader(true);
        searchTerm.current = term;
        carService.searchRentedCars(term)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : 1, "type": "searched"}));
                dispatch(saveCars({"page": 1, "cars": data.cars, "type": "searched"}));
                dispatch(savePaginationData({"paginationData" : data.paginationData, "type": "searched"}));
                setLoader(false);
                setIsSearched(true);
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
            
                <div className="ml-auto mt-3">
                    <Search
                        setIsSearched={setIsSearched}
                        getCarData={searchCars}
                        setLoader = {setLoader}
                        widthOfSearch='450' 
                        placeholder={"Type license of car or the user personal data or card id"}
                    />
                </div>
                <h4>Rented Cars</h4>
                {
                    cars !== null ? 
                        <>
                            <DefaultTable
                                data = {cars}
                                columns={["License", "First and last name", "Card id of user", "Phone number", "Start rent date", "End rent date", "Price per day", "Accept car", "Extend rent"]}
                                renderRow = {renderTableRow}
                            />
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
                {
                    extendRentModal && <>
                        <ExtendRentModal 
                            currentPage={currentPage}
                            carData = {carData.current}
                            closeModal = {(showOrHide) => setExtendRentModal(showOrHide)}/>
                        <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={(showOrHide) => setExtendRentModal(showOrHide)}/>
                        </> 
                }
            </div>
        </div>
    );
}

export default RentedCars;