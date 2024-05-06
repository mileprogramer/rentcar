import React, {useState} from 'react';
import carService from "../services/carService";

function Sort({setCars}) {
    
    const sortCar = async (event)=>{
        if(event.target.value === '0') return ;
        let criterium = null;
        let sortedCars = [];
        if(event.target.value.startsWith("-")){
            criterium = event.target.value.slice(1, event.target.value.length);
            sortedCars = await carService.sortCars("desc", criterium);
        }
        else{
            criterium = event.target.value;
            sortedCars = await carService.sortCars("asc", criterium);
        }
        setCars([...sortedCars]);
    }

    return (
        <select className="form-select w-50" onChange={(event)=> sortCar(event)}>
            <option value="0">Sort by...</option>
            <option value="pricePerDay">Price asc</option>
            <option value="-pricePerDay">Price desc</option>
            <option value="-model"> Model desc</option>
            <option value="model"> Model asc </option>
            <option value="reset"> Reset sort </option>
        </select>
    );
}

export default Sort;