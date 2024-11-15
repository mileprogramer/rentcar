import React from 'react';
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import NavigationItems from './NavigationItems';
import { useAuth } from '../context/AuthContext';
import { hostname } from '../config/globals';

function Navbar(props) {

    const { isAdminLogged } = useAuth();

    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <NavLink to="/" className="nav-link">
                    <img src={hostname + "/logo.png"} width={100} alt="" />
                </NavLink>
                { isAdminLogged() ? <NavigationItems/> : null }
            </div>
        </nav>
    );
}

export default Navbar;