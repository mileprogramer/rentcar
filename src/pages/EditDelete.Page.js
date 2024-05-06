import React, {useState} from 'react';
import EditDeleteTable from "../components/EditDeleteTable";
import Navbar from "../components/Navbar.Component";

function EditDeletePage(props) {

    return (
        <>
        <Navbar/>
        <div className="container">
            <EditDeleteTable />
        </div>
        </>
    );
}

export default EditDeletePage;