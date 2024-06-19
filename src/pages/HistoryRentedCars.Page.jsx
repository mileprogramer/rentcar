import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";

let allHistoryData = [];
function HistoryRentedCars(props) {

    const [historyData, setHistoryData] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        carService.getHistoryRented()
            .then((cars)=>{
                setHistoryData(cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakes(error);
            })
    }, []);

    const search = (data) =>{
        allHistoryData = [...historyData];
        setHistoryData(data);
    }

    const resetSearch = () =>{
        setHistoryData(allHistoryData);
    }

    return (
        <>
            <div className="container">
                <Navbar/>
                <h1 className="my-3">History of all rented cars</h1>
                <SearchHistoryRented search = {search} resetSearch = {resetSearch}  setLoader = {setLoader}/>
                <table className="table">
                    <thead>
                    <tr>
                        <td>License</td>
                        <td>Personal Data</td>
                        <td>Phone number</td>
                        <td>Id card user</td>
                        <td>Start rent date</td>
                        <td>End rent date</td>
                        <td>Price per day</td>
                        <td>Total Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        historyData.map((rentedCar, index) => {
                            return (<tr key={index}>
                                <td>{rentedCar.license}</td>
                                <td>{rentedCar.personalData}</td>
                                <td>{rentedCar.phoneNumber}</td>
                                <td>{rentedCar.idCard}</td>
                                <td>{rentedCar.startDate}</td>
                                <td>{rentedCar.returnDate}</td>
                                <td>{rentedCar.pricePerDay}</td>
                                <td>{rentedCar.totalPrice.toFixed(2)}</td>
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default HistoryRentedCars;