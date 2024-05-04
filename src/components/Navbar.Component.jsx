import React from 'react';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand bg-white">
            <div className="container">
                <h1>Rent a car agency</h1>
                <ul className="navbar-nav d-flex gap-3">
                    <li className="nav-item"> All Cars </li>
                    <li className="nav-item"> Accept Car </li>
                    <li className="nav-item"> Add Car </li>
                    <li className="nav-item"> Edit/Delete cars </li>
                    <li className="nav-item"> Best Selling Cars </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;