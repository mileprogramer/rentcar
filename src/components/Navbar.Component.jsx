import React from 'react';
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <NavLink to="/" className="nav-link">
                    <img src="http://localhost:3000/logo.png" width={100} alt="" />
                </NavLink>
                <ul className="navbar-nav d-flex gap-3">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                         Available Cars </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/rented-cars" className="nav-link"> 
                        Rented Cars </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/statistics" className="nav-link"> 
                        Statistics </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-car" className="nav-link"> 
                            Add Car </NavLink>
                        </li>
                    <li className="nav-item">
                        <NavLink to="/edit-delete-cars" className="nav-link">
                         Edit/Delete Cars </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;