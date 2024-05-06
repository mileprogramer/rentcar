import React from 'react';
import Navbar from "../components/Navbar.Component";
import AcceptCarForm from "../components/AcceptCarForm.Component";

function AcceptCarPage(props) {
    return (
        <>
        <Navbar/>
        <div className="container">
            <AcceptCarForm />
        </div>
        </>
    );
}

export default AcceptCarPage;