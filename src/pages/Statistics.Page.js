import React, {useEffect, useRef, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";
import Pagination from "../components/Pagination.Component";
import { useDispatch, useSelector } from 'react-redux';
import { saveStats, savePaginationData, selectStats, selectCurrentPage, selectPaginationData, setCurrentPage, selectShouldFetchNextPage, selectFilterStats, selectFilterPaginationData, selectFilterCurrentPage, setFilterCurrentPage } from '../redux/statistics.slicer';
import StatsTable from '../components/StatsTable.Component';
import Loader from '../components/Loader.Component';
import StatDetails from '../components/StatDetails.Component';
import ModalOverlay from "../components/ModalOverlay.Component";

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
    const [detailsModel, setDetailsModel] = useState(false);
    const [activeOverlay, setActiveOverlay] = useState(false);
    const detailsModelData = useRef({});

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

    function openDetails (statId){
        if(filteredStats){
            detailsModelData.current = filteredStats.find(stat => stat.id === statId);
        }
        else{
            detailsModelData.current = stats.find(stat => stat.id === statId);
        }
        setDetailsModel(true)
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
        <div className='postion-relative'>
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
                                <StatsTable 
                                    stats={stats} 
                                    openDetails={(statId) => openDetails(statId)} 
                                    /> 
                                <Pagination 
                                    elementsPerPage={paginationData.elementsPerPage}
                                    totalElements={paginationData.totalElements}
                                    changePage={(page) => dispatch(setCurrentPage({page}))}
                                    currentPage={currentPage}/>
                            </> :

                            <>
                                <StatsTable 
                                    stats={filteredStats} 
                                    openDetails={(statId) => openDetails(statId)}  
                                    
                                /> 
                                <Pagination 
                                    elementsPerPage={filteredPaginationData.elementsPerPage}
                                    totalElements={filteredPaginationData.totalElements}
                                    changePage={(page) => dispatch(setFilterCurrentPage({page}))}
                                    currentPage={currentFilterPage}/>
                            </> 
                }

                {
                    detailsModel && <>
                        <StatDetails 
                            rentedCarData={detailsModelData.current} 
                            closeModal = {() => {
                                setDetailsModel(false)
                            }}
                        />
                        <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={(showOrHide) => setDetailsModel(showOrHide)}/>
                    </> 
                }
            </div>
        </div>
    );
}

export default StatisticsPage;