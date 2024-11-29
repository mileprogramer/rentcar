import React, { useRef, useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";
import DeleteModal from "../components/DeleteModal.Component";
import carService from "../services/carService";
import EditModal from "../components/EditModal.Component";
import Loader from "../components/Loader.Component";
import Pagination from "../components/Pagination.Component";
import Search from '../components/Search.Component';
import MistakesAlert from "../components/MistakesAlert.Component";
import useFetchStandard from '../hooks/useFetchStandard';
import { cacheNames } from '../config/cache';

function EditDeletePage(props) {

    const [deleteCarModal, setDeleteCarModal] = useState(false);
    const [editCarModal, setEditCarModal] = useState(false);
    const carData = useRef({});

    const {
        data,
        error,
        isError,
        isLoading,
        searchFn,
        changePage,
        clearSearch,
    } = useFetchStandard({
        mainKey: cacheNames.allCars,
        fnForGetSource: carService.getCars.bind(carService),
        fnForSearch: carService.searchAllCars.bind(carService),
     });


    const cars = data?.cars;
    const paginationData = data?.paginationData;

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

    const renderContentPage = () => {
        
        if(isError) {
            return <MistakesAlert mistakes = {error} />
        }
        
        if(isLoading) {
            return <Loader />
        }

        return <>
            <EditDeleteTable 
                cars={cars}
                openDeleteModal = {(event) => openDeleteModal(event.target.name)}
                openEditModal = {(event) => openEditModal(event.target.name)}
            />
            <Pagination elementsPerPage={paginationData.elementsPerPage}
                totalElements={paginationData.totalElements}
                changePage={(page) => changePage(page)}
                currentPage={paginationData.currentPage}
            />
        
            {
                deleteCarModal && <DeleteModal 
                    modalActive={deleteCarModal}
                    car = {carData.current}
                    setModalActive={(showOrHide) => setDeleteCarModal(showOrHide)}
                />
            }
            {
                editCarModal && <EditModal 
                    modalActive={editCarModal}
                    setModalActive={(showOrHide) => setEditCarModal(showOrHide)}
                    car={carData.current} 
                />
            }
        </>

    }

    return (
        <div className='position-relative'>
            <Navbar/>
            <div className="container">
            <div className="ml-auto">
                <Search
                    clearSearch={clearSearch}
                    search={searchFn}
                    placeholder={"Type license, brand, model of car"}
                />
            </div>
                { renderContentPage() }
            </div>
        </div>
    );
}

export default EditDeletePage;