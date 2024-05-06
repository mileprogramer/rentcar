import React from 'react';

function AcceptCarForm(props) {
    return (
        <div className="container">
            <h3>Fill the form to return a car</h3>
            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Type brand of car</label>
                <input
                    id="brand"
                    name="brand"
                    type="text"
                    className="form-control"
                    value={inputData.brand}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="model">Type model</label>
                <input
                    id="model"
                    name="model"
                    type="text"
                    className="form-control"
                    value={inputData.model}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="year">Type year</label>
                <input
                    id="year"
                    name="year"
                    type="text"
                    className="form-control"
                    value={inputData.year}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="price">Price per day</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    className="form-control"
                    value={inputData.price}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3 d-flex gap-3 my-3">
                <label htmlFor="airConditioner">Air conditioner</label>
                <input
                    id="airConditionerYes"
                    name="airConditioner"
                    type="radio"
                    value="true"
                    onChange={handleInput}
                    checked={inputData.airConditioner === 'true'}
                /> Yes
                <input
                    id="airConditionerNo"
                    name="airConditioner"
                    type="radio"
                    value="false"
                    onChange={handleInput}
                    checked={inputData.airConditioner === 'false'}
                /> No
            </div>

            <button className="btn btn-primary w-50 offset-3" onClick={addCar}>
                Add Car
            </button>
        </div>
    );
}

export default AcceptCarForm;