import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";

function AcceptCarForm({car, setAcceptModal, setAcceptCar}) {
    const [inputData, setInputData] = useState({
        license : car.license,
        review: '',
        userRating: '',
        totalPrice: calculateTotalPrice(car.startDate, car.returnDate, car.pricePerDay),
        startEndDate: car.startDate + " --- " + car.returnDate
    });

    const [returnedCar, setReturnedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };


    function calculateTotalPrice(startDate, returnDate, pricePerDay){
        let mSeconds = new Date(returnDate).getTime() - new Date(startDate).getTime();
        let days = mSeconds / (1000 * 60 * 60 * 24);
        return days * pricePerDay;
    }

    const acceptCar = () => {
        let mistakes = FormValidation.validateInputFields(inputData);
        console.log(mistakes);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }
        let carInfo = {
            license: inputData.license,
            userRating: inputData.userRating,
            review: inputData.review
        }
        carService.acceptCar(carInfo)
            .then(data =>{
                setAcceptCar(carInfo.license);
                setReturnedCar(data);
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    };
    return (
        <div className="edit-modal position-absolute top-50 start-50">
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
            {returnedCar && <div className="alert alert-success" role="alert">{returnedCar.message}</div>}
            <div className="card">
                <div className="card-header">
                    <h3>Fill the form to return a car</h3>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="brand">Type license</label>
                        <input
                            id="license"
                            name="license"
                            type="text"
                            disabled={true}
                            className="form-control"
                            value={inputData.license}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Date of taking car --- Date of returning car</label>
                        <input
                            disabled={true}
                            id="startEndDate"
                            name="startEndDate"
                            type="text"
                            className="form-control"
                            value={inputData.startEndDate}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Total price to pay</label>
                        <input
                            disabled={true}
                            id="totalPrize"
                            name="totalPrize"
                            type="text"
                            className="form-control"
                            value={inputData["totalPrice"]}
                        />
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="userRating">Insert user rating</label>
                        <select name="userRating" id="userRating" className="form-select" onChange={handleInput}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="license">User review</label>
                        <textarea
                            id="review"
                            name="review"
                            className="form-control"
                            value={inputData.review}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        onClick={() => setAcceptModal(false)}
                        className="btn btn-danger">Close modal</button>
                    <button className="btn btn-primary mx-3" onClick={acceptCar}>
                        Accept Car
                    </button>
                </div>
            </div>


        </div>
    );
}

export default AcceptCarForm;