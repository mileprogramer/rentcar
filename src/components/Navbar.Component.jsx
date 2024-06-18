import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand bg-white">
            <div className="container">
                <h1>Rent a car agency</h1>
                <ul className="navbar-nav d-flex gap-3">
                    <li className="nav-item"><Link to="/"> All Cars </Link></li>
                    <li className="nav-item"><Link to="/rented-cars"> Rented Cars </Link></li>
                    <li className="nav-item"><Link to="/add-car"> Add Car </Link></li>
                    <li className="nav-item"><Link to="/best-selling-cars"> Best Selling Cars </Link></li>
                    <li className="nav-item"><Link to="/edit-delete-cars"> Edit/Delete Cars </Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;