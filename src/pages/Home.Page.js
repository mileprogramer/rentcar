import React, {useState} from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import CarsTable from "../components/CarsTable.Component";
import carService from "../services/carService";
import Loader from "../components/Loader.Component";
import RentCar from "../components/RentCar.Component";
import Pagination from "../components/Pagination.Component";
import ModalOverlay from "../components/ModalOverlay.Component";
import { useDispatch, useSelector } from 'react-redux';
import { selectCars, selectPaginationData, selectCurrentPage } from '../redux/car.slicer';
import { saveCars, savePaginationData, setCurrentPage } from '../redux/car.slicer';

function HomePage(props) {
    const currentPage = useSelector((state) => selectCurrentPage(state));
    const cars = useSelector((state) => selectCars(state, currentPage));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const dispatch = useDispatch();
    
    const [loader, setLoader] = useState(true);
    const [modalRentCar, setModalRentCar] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [mistakesAPI, setMistakesAPI] = useState(null);
    const [isActiveOverlay, setActiveOverlay] = useState(false);
    const [rentedCarLicense, setRentedCarLicense] = useState("");
    
    if(cars === null){
        getCars(currentPage);
    }

    let shouldFetchNextPage = paginationData?.lastPage >= currentPage + 1 ? true : false;
    if(shouldFetchNextPage){
        // FETCH next page of cars for better UX
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
                        isActiveOverlay && <ModalOverlay bgColor="transparent" setModalActive={(showOrHide) => setModalRentCar(showOrHide)} setActiveOverlay = {(showOrHide) => setActiveOverlay(showOrHide)} />
                    }
                    <CarsTable
                        cars={cars}
                        setRentCarModal={openRentCarModal}
                        paginateData={paginationData}
                        openRentCarModal={openRentCarModal}
                    />
                    <Pagination elementsPerPage={paginationData.elementsPerPage}
                                totalElements={paginationData.totalElements}
                                changePage={(page) => dispatch(setCurrentPage({page}))}
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
                    {/* <Search setLoader = {setLoader} setIsSearched={setIsSearched}/> */}
                </div>
                {renderLoaderOrCarsTable()}
                <RentCar setModalRentCar = {setModalRentCar}
                    modalRentCar = {modalRentCar}
                    carLicense = {rentedCarLicense}
                    carFromPage = {currentPage}
                    setActiveOverlay={setActiveOverlay}
                />

            </div>
        </div>
    );
}

export default HomePage;