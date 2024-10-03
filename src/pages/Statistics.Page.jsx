import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveStats, savePaginationData, selectStats, selectCurrentPage, selectPaginationData, setCurrentPage } from '../redux/statistics.slicer';

function StatisticsPage(props) {

    const currentPage = useSelector((state) => selectCurrentPage(state));
    const stats = useSelector((state) => selectStats(state, currentPage));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const dispatch = useDispatch();

    const [mistakes, setMistakes] = useState([]);
    const [loader, setLoader] = useState(false);
    
    if(stats === null){
        getHistoryRented(currentPage);
    }

    function getHistoryRented(page = 1){
        carService.getHistoryRented(page)
            .then((data)=>{
                
                dispatch(setCurrentPage({"page" : page}));
                dispatch(saveStats({"page": page, "stats": data.stats}));
                dispatch(savePaginationData({"paginationData" : data.paginationData}));
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                setMistakes(error);
            })
    }

    // const search = (data) =>{
    //     setHistoryData(data.cars);
    //     setPaginationData(data.paginateData);
    // }

    // const resetSearch = () =>{
    //     getHistoryRented(1);
    // }

    return (
        <>
            <div className="container">
                <Navbar/>
                <h4 className="my-3">History of all rented cars</h4>
                {/* <SearchHistoryRented search = {search} resetSearch = {resetSearch}  setLoader = {setLoader}/> */}
                
                {stats === null || loader === true ? "" : 
                <>
                <table className="table">
                    <thead>
                    <tr>
                        <td>License</td>
                        <td>Personal Data</td>
                        <td>Phone number</td>
                        <td>Id card user</td>
                        <td>Start rent date</td>
                        <td>Wanted return date</td>
                        <td>Real return date</td>
                        <td>Price per day</td>
                        <td>Total Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stats.map((stat, index) => {
                            return (<tr key={index}>
                                <td>{stat.car.license}</td>
                                <td>{stat.user.name}</td>
                                <td>{stat.user.phone}</td>
                                <td>{stat.user.card_id}</td>
                                <td>{stat.start_date}</td>
                                <td>{stat.wanted_return_date}</td>
                                <td>{stat.real_return_date}</td>
                                <td>{stat.price_per_day}</td>
                                <td>{stat.total_price}</td>
                                <td></td>
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
                <Pagination 
                    elementsPerPage={paginationData.elementsPerPage}
                    totalElements={paginationData.totalElements}
                    changePage={(page) => dispatch(setCurrentPage({page}))}
                    currentPage={currentPage}/>
                </>}
            </div>
        </>
    );
}

export default StatisticsPage;