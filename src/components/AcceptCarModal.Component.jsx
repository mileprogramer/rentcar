import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";
import "../css/modal.css"
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { refreshFirstPage, returnCar } from '../redux/rentedCars.slicer';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../css/car-gallery.css"

dayjs.extend(customParseFormat);

function AcceptCarForm({carData, currentPage, closeModal}) {
    const [inputData, setInputData] = useState({
        note : "",
    });
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const [returnedCar, setReturnedCar] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    
    useEffect(() => {
        if (carData.car.images) {
            setImages(carData.car.images.map(image => ({ src: image })));
        }
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };


    function calculateTotalPrice(){
        if(carData.extended_rent){
            return (carData.price_per_day - (carData.price_per_day * (carData.discount / 100))) * dayjs().diff(dayjs(carData.start_date, "DD/MM/YYYY"), 'days');
        }
    }

    const acceptCar = () => {
        let mistakes = FormValidation.validateInputFields(inputData);

        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return ;
        }
        
        carService.acceptCar({car_id: carData.car_id, note: inputData.note})
            .then(data =>{
                dispatch(returnCar({"carId": carData.car_id, "page": currentPage}));
                dispatch(refreshFirstPage());
                setReturnedCar(data);
            })
            .catch(errors =>{
                setMistakes(errors);
            })
    };
    
    return (
        <div className="accept-modal z-3">
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
                    <h5>License: {carData?.car?.license}</h5>
                </div>
                <div className="card-body">
                    <div className="form-group py-3">
                        <label className='d-block' htmlFor="note">Insert the note</label>
                        <em>**Type here if user have any suggestions or objections for our service, If the user wants to return the car earlier than planned, they must provide a reason for the early return.</em>
                        <textarea
                            id="note"
                            name="note"
                            type="text"
                            className="form-control"
                            value={inputData.note}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <button
                            className='btn btn-warning me-3 mb-3'
                            onClick={() => setOpen(true)}
                        >
                            Open gallery
                        </button>
                        <em>All images before rent will be shown here</em>
                    </div>
                    
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={images}
                    />

                    <table className='table'>
                        <thead className='table-dark'>
                            <tr>
                                <td>Started Rent</td>
                                <td>End rent/today date</td>
                                <td>Days Total</td>
                                <td>Price per day</td> 
                                <td>Discount</td> 
                                <td>Total price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{carData.start_date}</td>
                                <td>{dayjs().format("DD/MM/YYYY")}</td>
                                <td>
                                    {dayjs().diff(dayjs(carData.start_date, "DD/MM/YYYY"), 'days')}
                                </td>
                                <td>{carData.price_per_day}</td>
                                <td>{carData.discount}%</td>
                                <td className='fw-bold'>
                                    {calculateTotalPrice()}$
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button
                        onClick={() => closeModal(false)}
                        className="btn btn-outline-primary">Close modal</button>
                    <button className="btn btn-primary ml-auto" onClick={acceptCar}>
                        Accept Car
                    </button>
                </div>
            </div>


        </div>
    );
}

export default AcceptCarForm;