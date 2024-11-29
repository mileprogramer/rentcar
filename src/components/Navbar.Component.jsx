import React from 'react';
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import { useAuth } from '../context/AuthContext';
import { frontendUrl } from '../config/globals';
import Menu from './Menu.Component';

function Navbar(props) {

    const { isAdminLogged } = useAuth();

    return (
        <nav className="navbar navbar-expand position-relative">
            <div className="container">
                <NavLink to="/" className="nav-link">
                    <img src={frontendUrl + "logo.png"} width={100} alt="" />
                </NavLink>
                { isAdminLogged() ? <Menu/> : null }
            </div>
        </nav>
    );
}

export default Navbar;