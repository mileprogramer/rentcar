import React, {useState} from 'react';
import carService from "../services/carService";

function AcceptCarForm(props) {
    const [inputData, setInputData] = useState({
        license : '',
        review: '',
        userRating: ''
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

    const acceptCar = () => {
        const newMistakes = [];

        for (let prop in inputData) {
            if (inputData[prop] === '') {
                newMistakes.push(`You did not fill ${prop} field`);
            }
        }

        if (newMistakes.length > 0) {
            setMistakes(newMistakes);
            return;
        }

        // add the car
        if(carService.addCar(inputData)){
            setReturnedCar(true);
            setMistakes([]);
            setInputData({
                license : '',
                review: '',
                date: ''
            });
        }
        else{
            setMistakes(["Some mistake happened contact support"]);
        }
    };
    return (
        <div className="container">
            <h3 className="w-50 offset-3 my-3">Fill the form to return a car</h3>

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Type license</label>
                <input
                    id="license"
                    name="license"
                    type="text"
                    className="form-control"
                    value={inputData.license}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Date of taking --- Date of returning car</label>
                <input
                    disabled="true"
                    id="totalPrize"
                    name="totalPrize"
                    type="text"
                    className="form-control"
                    value={inputData.date}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3">
                <label htmlFor="brand">Total price to pay</label>
                <input
                    disabled="true"
                    id="totalPrize"
                    name="totalPrize"
                    type="text"
                    className="form-control"
                    value={inputData.date}
                    onChange={handleInput}
                />
            </div>

            <div className="form-group w-50 offset-3 my-3">
                <label htmlFor="userRating">Insert user rating</label>
                <select name="userRating" id="userRating" className="form-select">
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