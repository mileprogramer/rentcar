import React, {useEffect, useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";
import DeleteModal from "../components/DeleteModal.Component";
import carService from "../services/carService";
import EditModal from "../components/EditModal.Component";
import Loader from "../components/Loader.Component";

function EditDeletePage(props) {
    const [deleteCarModal, setDeleteCarModal] = useState(false);
    const [dataDeleteModal, setDataDeleteModal] = useState({});
    const [editCarModal, setEditCarModal] = useState(false);
    const [dataEditModal, setDataEditModal] = useState({});
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        carService.getCars()
            .then((cars)=>{
                setCars(cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                alert("Mistake happened"+ error);
            })
    }, []);


    const getCarData = (license, editOrDelete) => {
        const car = cars.find(car => car.license === license);
        if (editOrDelete === "edit") {
            setDataEditModal(car);
        } else if (editOrDelete === "delete") {
            setDataDeleteModal(car);
        }
    };

    const updateCarsTable = (editOrDelete, newCar, deleteLicense) =>{
        if(editOrDelete === "edit"){
            setCars(cars.map(car =>{
                if(car.id === newCar.id)
                    return newCar;
                else return car;
            }));
        }
        else if(editOrDelete === "delete"){
            setCars(cars.filter(car =>{
                return car.license !== deleteLicense
            }));
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container">
                {loader === false ?
                <EditDeleteTable loader={loader}
                                 setDeleteCarModal={setDeleteCarModal}
                                 setEditCarModal={setEditCarModal}
                                 cars={cars}
                                 getCarData = {getCarData}
                /> : <Loader/>}
                <DeleteModal modalActive={deleteCarModal}
                             setModalActive={setDeleteCarModal}
                             car={dataDeleteModal}
                             setCars = {updateCarsTable}
                />
                <EditModal modalActive={editCarModal}
                             setModalActive={setEditCarModal}
                             car={dataEditModal}
                             setCars = {updateCarsTable}
                />
            </div>
        </>
    );
}

export default EditDeletePage;