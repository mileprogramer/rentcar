import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { calculateTotalPrice, sumAllRents } from '../helpers/functions'

export default function ExtendedRentsTable({ rentedCarData }) {
    
    // show user extend rents and initnial rent data
    const [carData, setCarData] = useState(rentedCarData);

    useEffect(() => {
        // check for the first time rent
        if(dayjs(rentedCarData.return_date, "DD/MM/YYYY").isAfter(dayjs(), 'day')) {
            setCarData(prevData => ({
                ...prevData,
                return_date: dayjs().format("DD/MM/YYYY"),
                extended_rents: []
            }));
            return;
        }
        
        if (rentedCarData.extended_rents.length > 0) {
            let updatedExtendedRents = [...rentedCarData.extended_rents];

            for (let i = updatedExtendedRents.length - 1; i >= 0; i--) {
                const rent = updatedExtendedRents[i];
                
                if (dayjs(rent.return_date, "DD/MM/YYYY").isAfter(dayjs())) {
                    // Update the return_date to today's date
                    updatedExtendedRents[i] = {
                        ...rent,
                        return_date: dayjs().format("DD/MM/YYYY")
                    };
                }

                if (i === updatedExtendedRents.length - 1 && dayjs(rent.start_date, "DD/MM/YYYY").isAfter(dayjs())) {
                    updatedExtendedRents.pop();
                }
            }

            setCarData(prevData => ({
                ...prevData,
                extended_rents: updatedExtendedRents
            }));
        }
    }, [])
    
    if(!rentedCarData){
        return "";
    }

    return (
        <table className='table'>
        <thead className='table-dark'>
            <tr>
                <td>Start rent</td>
                <td>End rent</td>
                <td>Total Days</td>
                <td>Price per day</td> 
                <td>Discount</td>
                <td>Price</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{carData.start_date}</td>
                <td>{carData.return_date}</td>
                <td>
                    {dayjs(carData.return_date, "DD/MM/YYYY").diff(dayjs(carData.start_date, "DD/MM/YYYY"), 'days')}
                </td>
                <td>{carData.price_per_day}</td>
                <td>{carData.discount}%</td>
                <td className='fw-bold'>
                    {calculateTotalPrice(carData)}
                </td>
            </tr>
            {carData.extended_rents.map((extendRent, index) => {
                return <tr key={index}>
                            <td>{extendRent.start_date}</td>
                            <td>{extendRent.return_date}</td>
                            <td>
                                {dayjs(extendRent.return_date, "DD/MM/YYYY").diff(dayjs(extendRent.start_date, "DD/MM/YYYY"), 'days')}
                            </td>
                            <td>{extendRent.price_per_day}</td>
                            <td>{extendRent.discount}%</td>
                            <td className='fw-bold'>
                                {calculateTotalPrice({...extendRent})}
                            </td>
                        </tr>
            })}
            <tr> 
                <td colSpan={5}> </td>
                <td className='fw-bold'>Total price: {sumAllRents(carData)}</td>
            </tr>
        </tbody>
        </table>
    )
}
