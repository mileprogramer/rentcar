import React, {useState} from 'react';
import carService from "../services/carService";

function Sort({setCars, setLoader}) {
    const sortCar = async (event)=>{

        let urlQuery = "?";
        let criterium = event.target.value;
        let sortedCars = [];
        if(event.target.value.startsWith("-")){
            criterium = event.target.value.slice(1, event.target.value.length);
            urlQuery += `${criterium}=${criterium}:desc`;
        }
        else{
            urlQuery += `${criterium}=${criterium}:asc`;
        }

        setLoader(true);
        carService.sortCars(urlQuery)
            .then((cars)=>{
                setCars(cars);
                setLoader(false);
            })
            .catch((error)=>{
                alert("Error happened mistake is: "+ error.message);
            })
    }

    return (
        <select className="form-select w-50" onChange={(event)=> sortCar(event)}>
            <option value="reset">Sort by...</option>
            <option value="pricePerDay">Price asc</option>
            <option value="-pricePerDay">Price desc</option>
            <option value="-model"> Model desc</option>
            <option value="model"> Model asc </option>
        </select>
    );
}

export default Sort;