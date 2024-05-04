import React from 'react';
import AddCarForm from "../components/AddCarForm.Component";
import Navbar from "../components/Navbar.Component";

function AddCar() {
    return (
        <div className="container">
            <Navbar/>
            <div className="my-5">
                <AddCarForm/>
            </div>

        </div>


    );
}

export default AddCar;