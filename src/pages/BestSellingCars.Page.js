import React from 'react';
import Navbar from "../components/Navbar.Component";

function BestSellingCars(props) {
    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="card col-3">
                    <div className="card-header">
                        Merecedes Benz 2006
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default BestSellingCars;