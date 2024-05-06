import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";

function AcceptCarForm(props) {
    const [inputData, setInputData] = useState({
        license : '',
        review: '',
        userRating: '',
        totalPrize: '',
        startEndDate: ''
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

    const addPriceAndDays = async (event) =>{
        try {
            var response = await carService.addPriceAndDays(event.target.value);
        }catch (error){
            setMistakes(["The car with that license is not rented"]);
            return;
        }

        setInputData({
            license : event.target.value,
            review: '',
            userRating: '',
            totalPrize: response.carPrice * response.daysOfUsing,
            startEndDate: `${response.startDate} - ${response.returnDate}`
        });
    }

    const acceptCar = async (event, response) => {
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }

        // accept the car
        try{
            var result = await carService.acceptCar(inputData)
        }catch (error){
            setMistakes(["Some mistake happened contact support"]);
        }

        if(result){
            setReturnedCar(true);
            setMistakes([]);
            setInputData({
                license : '',
                review: '',
                date: ''
            });
        }
    };
    return (
        <div className="container">
            <h3 className="w-50 offset-3 my-3">Fill the form to return a car</h3>

            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}

            {returnedCar && <div className="alert alert-success" role="alert">You successfully added a car</div>}
            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Type license</label>
                <input
                    id="license"
                    name="license"
                    type="text"
                    className="form-control"
                    value={inputData.license}
                    onChange={(event)=>{
                        handleInput(event)
                        addPriceAndDays(event)
                    }}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Date of taking date --- Date of returning car</label>
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

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Total price to pay</label>
                <input
                    disabled={true}
                    id="totalPrize"
                    name="totalPrize"
                    type="text"
                    className="form-control"
                    value={inputData.totalPrize}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3 my-3">
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

            <div className="form-group w-50 offset-3 my-3">
                <label htmlFor="license">User review</label>
                <textarea
                    id="review"
                    name="review"
                    className="form-control"
                    value={inputData.review}
                    onChange={handleInput}
                />
            </div>

            <button className="btn btn-primary w-50 offset-3 my-3" onClick={acceptCar}>
                Accept Car
            </button>
        </div>
    );
}

export default AcceptCarForm;