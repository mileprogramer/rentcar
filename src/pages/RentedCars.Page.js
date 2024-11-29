import React, { useRef, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import Loader from "../components/Loader.Component";
import AcceptCarModalComponent from "../components/AcceptCarModal.Component";
import Pagination from '../components/Pagination.Component';
import Search from '../components/Search.Component';
import ExtendRentModal from '../components/ExtendRentModal.Component';
import DefaultTable from '../components/DefaultTable.Component';
import useFetchStandard from '../hooks/useFetchStandard';
import { cacheNames } from '../config/cache';
import MistakesAlert from '../components/MistakesAlert.Component';

function RentedCars(props) {

    const carData = useRef({});
    const [acceptModal, setAcceptModal] = useState(false);
    const [extendRentModal, setExtendRentModal] = useState(false);

    const {
        data,
        error,
        isError,
        isLoading,
        searchFn,
        changePage,
        clearSearch,
    } = useFetchStandard({
        mainKey: cacheNames.rentedCars,
        fnForGetSource: carService.getRentedCars.bind(carService),
        fnForSearch: carService.searchRentedCars.bind(carService),
     });

    const cars = data?.cars;
    const paginationData = data?.paginationData;


    const findReturnDate = (rentedCar) => {
        if(rentedCar?.extended_rents?.length > 0){
            return rentedCar.extended_rents[rentedCar.extended_rents.length-1].return_date;
        }
        return rentedCar.return_date;
    }

    const renderTableRow = (rentedCar) => {
        
        if(rentedCar && rentedCar.car && rentedCar.extended_rents)
            return <>
                <td>{rentedCar.car['license']}</td>
                <td>{rentedCar.user['name']}</td>
                <td>{rentedCar.user['card_id']}</td>
                <td>{rentedCar.user['phone']}</td>
                <td>{rentedCar.start_date}</td>
                <td>{findReturnDate(rentedCar)}</td>
                <td>{rentedCar.price_per_day}</td>
                <td>
                    <button
                        className="btn btn-dark"
                        onClick={() => {
                            carData.current = cars.find(car => car.car.license === rentedCar.car.license);
                            console.log(carData.current, cars, rentedCar.car.license)
                            setAcceptModal(true);
                        }}
                    > Accept Car </button>
                </td>
                <td>
                    <button
                        onClick={(event) => {
                            carData.current = cars.find(car => car.car.license === rentedCar.car.license);
                            setExtendRentModal(true);
                        }}
                        className="btn btn-primary"
                > Extend rent </button>
                </td>
            </>
    }

    const renderContentPage = () => {
        if(isError) {
            return <MistakesAlert mistakes={error} />
        }

        if(isLoading) {
            return <Loader />
        }

        return <>
            <h4>Rented Cars</h4>
            <DefaultTable
                data = {cars}
                columns={["License", "First and last name", "Card id of user", "Phone number", "Start rent date", "End rent date", "Price per day", "Accept car", "Extend rent"]}
                renderRow = {renderTableRow}
            />
            <Pagination elementsPerPage={paginationData.elementsPerPage}
                totalElements={paginationData.totalElements}
                changePage={(page) => changePage(page)}
                currentPage={paginationData.currentPage}
            />
            {
                acceptModal && 
                    <AcceptCarModalComponent 
                        carData = {carData.current}
                        closeModal = {(showOrHide) => setAcceptModal(showOrHide)}/>
            }
            {
                extendRentModal && <ExtendRentModal
                    carData = {carData.current}
                    closeModal = {(showOrHide) => setExtendRentModal(showOrHide)} 
                />
            }
        
        </>
    }
    
    
    
    return (
        <div className='position-relative' style={{height: "100vh"}}>
            <div className="container">
                <Navbar/>
            
                <div className="ml-auto mt-3">
                    <Search
                        clearSearch={clearSearch}
                        search={searchFn}
                        placeholder={"Type license or the user personal data"}
                    />
                </div>
                { renderContentPage() }
            </div>
        </div>
    );
}

export default RentedCars;