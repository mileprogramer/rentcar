import React from 'react';
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import NavigationItems from './NavigationItems';
import { useAuth } from '../context/AuthContext';

function Navbar(props) {

    const { isAdminLogged } = useAuth();

    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <NavLink to="/" className="nav-link">
                    <img src="http://localhost:3000/logo.png" width={100} alt="" />
                </NavLink>
                { isAdminLogged() ? <NavigationItems/> : null }
            </div>
        </nav>
    );
}

export default Navbar;