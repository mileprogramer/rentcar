import React, {useEffect, useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";
import DeleteModal from "../components/DeleteModal.Component";
import carService from "../services/carService";
import EditModal from "../components/EditModal.Component";

function EditDeletePage(props) {
    const [deleteCarModal, setDeleteCarModal] = useState(false);
    const [dataDeleteModal, setDataDeleteModal] = useState({});
    const [editCarModal, setEditCarModal] = useState(false);
    const [dataEditModal, setDataEditModal] = useState({});
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        let fetchCars = async () => {
            let carsData = await carService.getCars();
            setCars(carsData);
            setLoader(true);
        }
        fetchCars();
    }, []);
    return (
        <>
            <Navbar/>
            <div className="container">
                <EditDeleteTable loader={loader}
                                 setDeleteCarModal={setDeleteCarModal}
                                 setEditCarModal={setEditCarModal}
                                 cars={cars}
                                 setDataDeleteModal = {setDataDeleteModal}
                                 setDataEditModal={setDataEditModal}
                />
                <DeleteModal modalActive={deleteCarModal}
                             setModalActive={setDeleteCarModal}
                             car={dataDeleteModal}
                             setCars ={setCars}
                />
                <EditModal modalActive={editCarModal}
                             setModalActive={setEditCarModal}
                             car={dataEditModal}
                             setCars ={setCars}
                />
            </div>
        </>
    );
}

export default EditDeletePage;