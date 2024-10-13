import React from "react";
import "../css/modal.css";

export default function StatDetails({ rentedCarData, closeModal }) {

  return (
    <div className="stat-modal z-3">
      <div className="card">
        <div className="card-header">
          <p> License: {rentedCarData.car.license} </p>
        </div>
        <div className="card-body">
          <p className="display-6">User info</p>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <td>Card id</td>
                <td>First and last name</td>
                <td>Phone</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rentedCarData.user.card_id}</td>
                <td>{rentedCarData.user.name}</td>
                <td>{rentedCarData.user.phone}</td>
                <td>{rentedCarData.user.email}</td>
              </tr>
            </tbody>
          </table>

          <p className="display-6">Rent info</p>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <td>Start rent</td>
                <td>Wanted end rent</td>
                <td>Real end rent</td>
                <td>Price per day</td>
                <td>Discount</td>
                <td>Reason for discount</td>
                <td>Note</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rentedCarData.start_date}</td>
                <td>{rentedCarData.wanted_return_date}</td>
                <td>{rentedCarData.real_return_date}</td>
                <td>{rentedCarData.price_per_day}</td>
                <td>{rentedCarData.discount}%</td>
                <td>{rentedCarData.reason_for_discount}</td>
                <td>{rentedCarData.note}</td>
              </tr>
            </tbody>
          </table>
          
          {rentedCarData.extended_rents?.length > 0 ? (
            <>
              <p>Extended rents</p>
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <td>Start rent</td>
                    <td>Wanted End rent</td>
                    <td>Price per day</td>
                    <td>Discount</td>
                    <td>Reason for discount</td>
                  </tr>
                </thead>
                <tbody>
                  {rentedCarData.extended_rents?.map((extendRent, index) => {
                    return (
                      <tr key={index}>
                        <td>{extendRent.start_date}</td>
                        <td>{extendRent.return_date}</td>
                        <td>{extendRent.price_per_day}</td>
                        <td>{extendRent.discount}%</td>
                        <td>{extendRent.reason_for_discount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="card-footer text-end">
          <button className="btn btn-outline-primary" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
