import React from 'react';

function AddCarForm(props) {
    return (
        <div className="container">

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Type brand</label>
                <input id="brand" name="brand" type="text" className="form-control"/>
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="model">Type models</label>
                <input id="model" name="model" type="text" className="form-control"/>
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="years">Type years old</label>
                <input id="years" name="years" type="text" className="form-control"/>
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="years">Price per day</label>
                <input id="price" name="price" type="number" className="form-control"/>
            </div>

            <div className="form-group w-50 offset-3 d-flex gap-3 my-3">
                <label htmlFor="aircondition">Air conditioner</label>
                Yes <input id="aircondition" name="aircondition" type="radio"/>
                No <input id="aircondition" name="aircondition" type="radio"/>
            </div>
            <button className="btn btn-primary w-50 offset-3">Add Car</button>
        </div>
    );
}

export default AddCarForm;