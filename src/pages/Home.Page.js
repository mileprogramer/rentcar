import React from 'react';
import Navbar from "../components/Navbar.Component";
import Search from "../components/Search.Component";
import Sort from "../components/Sort.Component";
import CarsTable from "../components/CarsTable.Component";

function HomePage(props) {
    return (
        <div className="container">
            <Navbar/>
            <div className="d-flex gap-3 my-5">
                <Search/>
                <Sort/>
            </div>
            <CarsTable/>
        </div>
    );
}

export default HomePage;