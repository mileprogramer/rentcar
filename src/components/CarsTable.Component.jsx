import "../css/table.css";
import "../css/car-colors.css";


function CarsTable({cars, openRentCarModal}) {
    console.log(cars[0]);
    return (
        <>
        <table className="table table-striped">
            <thead>
            <tr>
                <td>License</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Years old</td>
                <td>Air Conditioner</td>
                <td>Person fit in</td>
                <td>Car consumption in city</td>
                <td>Transmissions type</td>
                <td>Reservation</td>
            </tr>
            </thead>
            <tbody>
            {
                cars.map((car, index) => {
                    return (<tr key={index}>
                        <td>{car.license}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.air_conditioning_type}</td>
                        <td>{car.person_fit_in}</td>
                        <td>{car.car_consumption}l/100km</td>
                        <td>{car.transmission_type}</td>
                        <td>
                            <input onClick={(event)=>openRentCarModal(event)}
                               type="button"
                               value="Rent car"
                               name={car.license}
                               className="btn btn-primary"/>
                        </td>
                    </tr>)
                })
            }
            </tbody>
        </table>
        </>
    );
}

export default CarsTable;