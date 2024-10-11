import React, {useEffect, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveStats, savePaginationData, selectStats, selectCurrentPage, selectPaginationData, setCurrentPage, selectShouldFetchNextPage, selectFilterStats, selectFilterPaginationData, selectFilterCurrentPage, setFilterCurrentPage } from '../redux/statistics.slicer';
import StatsTable from '../components/StatsTable.Component';
import Loader from '../components/Loader.Component';

function StatisticsPage(props) {

    const currentPage = useSelector((state) => selectCurrentPage(state));
    const stats = useSelector((state) => selectStats(state, currentPage));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPage));
    const shouldFetchNextPage = useSelector((state) => selectShouldFetchNextPage(state));

    const currentFilterPage = useSelector((state) => selectFilterCurrentPage(state));
    const filteredPaginationData = useSelector((state) => selectFilterPaginationData(state, currentFilterPage));
    const filteredStats = useSelector((state) => selectFilterStats(state, currentFilterPage));

    const dispatch = useDispatch();

    const [mistakes, setMistakes] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isSearched, setIsSearched] = useState(false); 

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
    
    return (
        <>
            <div className="container">
                <Navbar/>
                <h4 className="my-3">Statistics</h4>
                <SearchHistoryRented 
                    setLoader={setLoader} 
                    setIsSearched = {(resetOrSet) => setIsSearched(resetOrSet)} 
                    isSearched={isSearched}
                />
                
                {
                    stats === null || loader === true ? <Loader /> : 
                    
                        isSearched === false ?
                            <>
                                <StatsTable stats={stats} /> 
                                <Pagination 
                                    elementsPerPage={paginationData.elementsPerPage}
                                    totalElements={paginationData.totalElements}
                                    changePage={(page) => dispatch(setCurrentPage({page}))}
                                    currentPage={currentPage}/>
                            </> :

                            <>
                                <StatsTable stats={filteredStats} /> 
                                <Pagination 
                                    elementsPerPage={filteredPaginationData.elementsPerPage}
                                    totalElements={filteredPaginationData.totalElements}
                                    changePage={(page) => dispatch(setFilterCurrentPage({page}))}
                                    currentPage={currentFilterPage}/>
                            </> 
                }
            </div>
        </>
    );
}

export default StatisticsPage;