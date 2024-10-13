import dayjs from 'dayjs'
import React from 'react'

export default function ExtendedRentsTable({ rentedCarData, calculateTotalPrice, sumAllRents }) {
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
              <td>{rentedCarData.start_date}</td>
              <td>{rentedCarData.return_date}</td>
              <td>
                  {dayjs(rentedCarData.return_date, "DD/MM/YYYY").diff(dayjs(rentedCarData.start_date, "DD/MM/YYYY"), 'days')}
              </td>
              <td>{rentedCarData.price_per_day}</td>
              <td>{rentedCarData.discount}%</td>
              <td className='fw-bold'>
                  {calculateTotalPrice(rentedCarData)}
              </td>
          </tr>
          {rentedCarData.extended_rents.map((extendRent, index) => {
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
              <td className='fw-bold'>Total price: {sumAllRents(rentedCarData)}</td>
          </tr>
      </tbody>
    </table>
  )
}
