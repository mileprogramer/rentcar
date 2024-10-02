import React, {useEffect, useRef, useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";
import DeleteModal from "../components/DeleteModal.Component";
import carService from "../services/carService";
import EditModal from "../components/EditModal.Component";
import Loader from "../components/Loader.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar, saveCars, savePaginationData, selectCars, selectCurrentPage, selectPaginationData, setCurrentPage } from '../redux/allCars.slicer';

function EditDeletePage(props) {
    const [deleteCarModal, setDeleteCarModal] = useState(false);
    const [editCarModal, setEditCarModal] = useState(false);
    // const [dataEditModal, setDataEditModal] = useState({});
    const currentPage = useSelector((state) => selectCurrentPage(state));
    const cars = useSelector((state) => selectCars(state, currentPage));//
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const carData = useRef({});
    
    useEffect(()=>{
        if(cars === null){
            setLoader(true);
            getCars(currentPage);
        }
    }, [currentPage])

    let shouldFetchNextPage = paginationData?.lastPage >= currentPage + 1 ? true : false;
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

    const handleDeleteCar = (event) => {
        carService.deleteCar(event.target.name)
            .then(data=>{
                dispatch(deleteCar({"license": event.target.name, "page": currentPage}));
                setDeleteCarModal(false);
            })
            .catch(error =>{
                alert(error);
            })
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

    return (
        <div className='position-relative'>
            <Navbar/>
            <div className="container">
                {loader === false && cars !== null ?
                <>
                    <EditDeleteTable 
                        cars={cars}
                        // handleEditCar={}
                        openDeleteModal = {(event) => openDeleteModal(event.target.name)}
                                    //  getCarData = {getCarData}
                    />
                    <Pagination elementsPerPage={paginationData.elementsPerPage}
                        totalElements={paginationData.totalElements}
                        changePage={(page) => dispatch(setCurrentPage({page}))}
                        currentPage={currentPage}
                    />
                
                    {deleteCarModal && <DeleteModal 
                        modalActive={deleteCarModal}
                        handleDeleteCar = {handleDeleteCar}
                        currentPage = {currentPage}
                        car = {carData.current}
                        setModalActive={(showOrHide) => setDeleteCarModal(showOrHide)}
                    />}
                {/* <EditModal modalActive={editCarModal}
                             setModalActive={setEditCarModal}
                             car={dataEditModal}
                            //  setCars = {updateCarsTable}
                /> */}
                </> : <Loader/>}
            </div>
        </div>
    );
}

export default EditDeletePage;