import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveStats, savePaginationData, selectStats, selectCurrentPage, selectPaginationData, setCurrentPage, selectShouldFetchNextPage } from '../redux/statistics.slicer';

function StatisticsPage(props) {

    const currentPage = useSelector((state) => selectCurrentPage(state));
    const stats = useSelector((state) => selectStats(state, currentPage));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const shouldFetchNextPage = useSelector((state) => selectShouldFetchNextPage(state));
    const dispatch = useDispatch();

    const [mistakes, setMistakes] = useState([]);
    const [loader, setLoader] = useState(false);
    
    if(stats === null){
        getHistoryRented(currentPage);
    }

    if(shouldFetchNextPage){
        // FETCHING next page of cars for better UX and getting the next available car
        let nextPage = currentPage + 1;
        carService.getHistoryRented(nextPage)
            .then((data)=>{
                dispatch(saveStats({"page": nextPage, "stats": data.stats}));
            })
            .catch((error)=>{
                console.log(error);
            })
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
                        <td>Start rent date</td>
                        <td>Wanted return date</td>
                        <td>Real return date</td>
                        <td>Extended rent</td>
                        <td>User returned car</td>
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
                                <td>{stat.wanted_return_date}</td>
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
                                <td>
                                    <button className='btn btn-primary'>
                                        See details
                                    </button>
                                </td>
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