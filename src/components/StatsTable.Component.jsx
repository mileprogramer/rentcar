import React from 'react'
import { formatPrice } from '../helpers/functions'

export default function StatsTable({ stats, openDetails }) {
    if(!stats){
        return "There is not statistics data"
    }

    function findReturnDate(stats){
        if(stats.extended_rents?.length > 0){
            return stats.extended_rents[stats.extended_rents.length-1].return_date;
        }
        return stats.wanted_return_date;
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <td>License</td>
                    <td>First and last name</td>
                    <td>Phone number</td>
                    <td>Start rent date</td>
                    <td>Wanted return date</td>
                    <td>Real return date</td>
                    <td>Extended rent</td>
                    <td>User returned car</td>
                    <td>Total price</td>
                    <td>  </td>
                </tr>
            </thead>
            <tbody>
                {
                    stats.map((stat, index) => {
                        return (<tr key={index}>
                            <td>{stat.car.license}</td>
                            <td>{stat.user.name}</td>
                            <td>{stat.user.phone}</td>
                            <td>{stat.start_date}</td>
                            <td>{findReturnDate(stat)}</td>
                            <td>{stat.real_return_date}</td>
                            <td>{stat.extend_rent ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg> 
                            }
                            </td>
                            <td>{stat.real_return_date ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg> 
                            }
                            </td>
                            <td className='fw-bold'>{stat.total_price ? formatPrice(stat.total_price) : ""}</td>
                            <td>
                                <button 
                                    onClick={() => openDetails(stat.id)}
                                    className='btn btn-primary'>
                                    See details
                                </button>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    )
}
