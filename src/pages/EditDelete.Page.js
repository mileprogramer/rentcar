import React, {useEffect, useRef, useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";
import DeleteModal from "../components/DeleteModal.Component";
import carService from "../services/carService";
import EditModal from "../components/EditModal.Component";
import Loader from "../components/Loader.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveCars, savePaginationData, selectCars, selectCurrentPage, selectPaginationData, setCurrentPage } from '../redux/allCars.slicer';
import { selectShouldFetchNextPage } from '../redux/allCars.slicer';
import Search from '../components/Search.Component';

function EditDeletePage(props) {

    const [isSearched, setIsSearched] = useState(false);
    let typeIsSearched = isSearched ? "searched" : "";

    const [deleteCarModal, setDeleteCarModal] = useState(false);
    const [editCarModal, setEditCarModal] = useState(false);
    const currentPage = useSelector((state) => selectCurrentPage(state, typeIsSearched));
    const cars = useSelector((state) => selectCars(state, currentPage, typeIsSearched));
    const paginationData = useSelector((state) => selectPaginationData(state, typeIsSearched));
    const shouldFetchNextPage = useSelector(state => selectShouldFetchNextPage(state));
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const carData = useRef({});
    const searchTerm = useRef({});
    
    if(isSearched === true && cars === null){
        carService.searchAllCars(searchTerm.current, currentPage)
            .then((data)=>{
                dispatch(saveCars({"page": currentPage, "cars": data.cars, "type": "searched"}));
            })
            .catch((error)=>{
                alert(error);
            })
    }

    if(cars === null && isSearched === false){
        getCars(currentPage);
    }

    if(shouldFetchNextPage){
        // FETCH next page of cars for better UX
        let nextPage = currentPage + 1;
        carService.getCars(nextPage)
            .then((data)=>{
                dispatch(saveCars({"page": nextPage, "cars": data.cars}));
            })
            .catch((error)=>{
                alert("Mistake happened"+ error);
            })
    }

    const openDeleteModal = (license) =>{

        let car = cars.find(car => car.license === license);
        carData.current = car;
        setDeleteCarModal(true);

    }

    const openEditModal = (license) =>{

        let car = cars.find(car => car.license === license);
        carData.current = car;
        setEditCarModal(true);

    }

    function getCars(page = 1){
        carService.getCars(page)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : page}));
                dispatch(saveCars({"page": page, "cars": data.cars}));
                dispatch(savePaginationData({"paginationData" : data.paginationData}));
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                alert("Mistake happened"+ error);
            })
    }

    function searchCars(term){
        setLoader(true);
        searchTerm.current = term;
        carService.searchAllCars(term, null)
            .then((data)=>{
                dispatch(setCurrentPage({"page" : 1, "type": "searched"}));
                dispatch(saveCars({"page": 1, "cars": data.cars, "type": "searched"}));
                dispatch(savePaginationData({"paginationData" : data.paginationData, "type": "searched"}));
                setLoader(false);
                setIsSearched(true);
            })
            .catch((error)=>{
                setLoader(false);
                alert(error);
            })
    }

    return (
        <div className='position-relative'>
            <Navbar/>
            <div className="container">
            <div className="ml-auto" style={{marginRight: "7rem"}}>
                <Search
                    setIsSearched={setIsSearched}
                    getCarData={searchCars}
                    setLoader = {setLoader} 
                    placeholder={"Type license, brand, model of car"}
                />
            </div>
                {loader === false && cars !== null ?
                <>
                    <EditDeleteTable 
                        cars={cars}
                        openDeleteModal = {(event) => openDeleteModal(event.target.name)}
                        openEditModal = {(event) => openEditModal(event.target.name)}
                    />
                    <Pagination elementsPerPage={paginationData.elementsPerPage}
                        totalElements={paginationData.totalElements}
                        changePage={(page) => dispatch(setCurrentPage({page, "type": typeIsSearched}))}
                        currentPage={currentPage}
                    />
                
                    {
                        deleteCarModal && <DeleteModal 
                            typeIsSearched = {typeIsSearched}
                            modalActive={deleteCarModal}
                            currentPage = {currentPage}
                            car = {carData.current}
                            setModalActive={(showOrHide) => setDeleteCarModal(showOrHide)}
                        />
                    }
                    {
                        editCarModal && <EditModal 
                            typeIsSearched = {typeIsSearched}
                            modalActive={editCarModal}
                            setModalActive={(showOrHide) => setEditCarModal(showOrHide)}
                            currentPage = {currentPage}
                            car={carData.current} 
                        />
                    }
                </> : <Loader/>}
            </div>
        </div>
    );
}

export default EditDeletePage;