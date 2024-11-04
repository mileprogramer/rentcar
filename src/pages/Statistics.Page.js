import React, {useRef, useState} from 'react';
import carService from "../services/carService";
import Navbar from "../components/Navbar.Component";
import SearchHistoryRented from "../components/SearchHistoryRented.Component";
import Pagination from "../components/Pagination.Component";
import Loader from '../components/Loader.Component';
import StatDetails from '../components/StatDetails.Component';
import ModalOverlay from "../components/ModalOverlay.Component";
import DefaultTable from "../components/DefaultTable.Component"
import { formatPrice } from '../helpers/functions';
import useFetchStatistics from '../hooks/useFetchStatistics';
import MistakesAlert from '../components/MistakesAlert.Component';

function StatisticsPage(props) {

    const [detailsModel, setDetailsModel] = useState(false);
    const [activeOverlay, setActiveOverlay] = useState(false);
    const detailsModelData = useRef({});

    const {
        data,
        error,
        isError,
        isLoading,
        searchFn,
        changePage,
        clearSearch,
    } = useFetchStatistics();

    const stats = data?.stats;
    const paginationData = data?.paginationData;

    const renderTableRow = (stat) => {
        
        if(stat && stat?.car && stat?.extended_rents){
            return (<>
            <td>{stat.car?.license}</td>
            <td>{stat.user?.name}</td>
            <td>{stat.user?.phone}</td>
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
            </>)
        }
    }

    function openDetails (statId){
        detailsModelData.current = stats.find(stat => stat.id === statId);
        setDetailsModel(true)
    }

    function findReturnDate(){
        if(stats.extended_rents?.length > 0){
            return stats.extended_rents[stats.extended_rents.length-1].return_date;
        }
        return stats.wanted_return_date;
    }
    
    const renderContentPage = () => {
        if(isError) {
            return <MistakesAlert mistakes={error} />
        }

        if(isLoading) {
            return <Loader/>
        }

        return <>
        
            <DefaultTable
                data = {stats}
                columns = {["License", "First and last name", "Phone number", "Start rent date", "Wanted return date", "Real return date", "Extended rent", "User returned car", "Total price", "Action"]}
                renderRow = {renderTableRow}
            />
            <Pagination 
                elementsPerPage={paginationData.elementsPerPage}
                totalElements={paginationData.totalElements}
                changePage={(page) => changePage(page)}
                currentPage={paginationData.currentPage}/>
        </>
    }

    return (
        <div className='postion-relative'>
            <div className="container">
                <Navbar/>
                <h4 className="my-3">Statistics</h4>
                <SearchHistoryRented 
                    search = {searchFn}
                    clearSearch = {clearSearch} 
                />
                { renderContentPage() }

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