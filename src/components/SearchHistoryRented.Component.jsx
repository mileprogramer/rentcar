import React, {useEffect, useRef, useState} from 'react';
import carService from "../services/carService";
import { saveFilterPaginationData, saveFilterStats, setFilterCurrentPage } from '../redux/statistics.slicer';
import { useDispatch } from 'react-redux';
import ActiveFilters from './ActiveFilters.Components';
import dayjs from 'dayjs';
import Mistakes from "../components/MistakesAlert.Component"

function SearchHistoryRented({ setLoader, setIsSearched, isSearched, currentPage }) {

    const initialSearchData = {
        license: '',
        startDate: '',
        endDate: '',
        name: '',
        extendRent: "",
        returnedCar: "",
    };
    const [inputSearch, setInputSearch] = useState(initialSearchData);
    const [mistakes, setMistakes] = useState([]);
    const showFilters = useRef({
        filters : {},
        show : false,
    });
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    
    useEffect(() => {
        // user wants next page
        if (currentPage) {
            carService.searchHistoryRented(query + "&page=" + currentPage)
                .then((data)=>{
                    dispatch(saveFilterStats({"page": currentPage, "stats": data.stats}));
                })
                .catch((error)=>{
                    console.log(error);

                })
        }
    }, [currentPage])


    const handleSearch = ()=> {
        
        let query = "?";
        for(let prop in inputSearch){
            if(inputSearch[prop]){
                let propToSnakeCase = prop
                    .replace(/([A-Z])/g, letter => `_${letter.toLowerCase()}`)
                    .replace(/^_/, '');
                query += `${propToSnakeCase}=${inputSearch[prop]}`;
                query += "&";
            }
        }
    
        if(query === "?") return ;
        query = query.slice(0, query.length-1);
        setQuery(query);
        setLoader(true);
        
        carService.searchHistoryRented(query)
            .then((data)=>{
                dispatch(setFilterCurrentPage({"page" : 1}));
                dispatch(saveFilterStats({"page": 1, "stats": data.stats}));
                dispatch(saveFilterPaginationData({"paginationData" : data.paginationData}));
                setIsSearched(true);
                setLoader(false);
                showFilters.show = true;
                showFilters.filters = inputSearch;
            })
            .catch((error)=>{
                setLoader(false);
                setMistakes(error);

            })
    }

    const handleResetSearch = () =>{
        setIsSearched(false);
        setInputSearch(initialSearchData);
        showFilters.filters = {};
        showFilters.show = false;
    }

    const handleInput = (event) =>{
        const { name, value } = event.target;
        setInputSearch({
            ...inputSearch,
            [name]: value
        });
    }

    const formatFilters = () => {
        let copyFilters = {...showFilters.filters};
        if(copyFilters.endDate){
            copyFilters.endDate = dayjs(copyFilters.endDate).format("DD/MM/YYYY");
        }
        if(copyFilters.startDate){
            copyFilters.startDate = dayjs(copyFilters.startDate).format("DD/MM/YYYY");
        }
        if(copyFilters.name){
            copyFilters.personalData = copyFilters.name;
            delete copyFilters.name;
        }
        return copyFilters;
    }

    const renderFilters = () => {
        if(showFilters.show){
            let copyFilters = formatFilters();
            console.log(copyFilters);
            return <ActiveFilters initialFiltersState={initialSearchData} filtersState={copyFilters} />
        }
        return "";
    }

    return (
        <>
        <div className="my-5 form-group d-flex gap-3 justify-content-end">
            <Mistakes mistakes = {mistakes} />
            <div className="form-group">
                <p>Insert license for car</p>
                <input
                    onChange={handleInput}
                    value={inputSearch.license}
                    name="license"
                    type="search"
                    className="form-control"
                    placeholder="Type license"/>
            </div>
            <div className="form-group">
                <p>Insert start date</p>
                <input
                    onChange={handleInput}
                    value={inputSearch.startDate}
                    name="startDate"
                    type="date"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <p>Insert end date</p>
                <input
                    onChange={handleInput}
                    value={inputSearch.endDate}
                    type="date"
                    name="endDate"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <p>User personal data</p>
                <input
                    onChange={handleInput}
                    value={inputSearch.name}
                    type="search"
                    name="name"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <p>Extended rent</p>
                <select name="extendRent" className='form-select' onChange={handleInput} value={inputSearch.extendRent}>
                    <option value="">All</option>
                    <option value={true}>With extended rent</option>
                    <option value={false}>Without extended rent</option>
                </select>
            </div>
            <div className="form-group">
                <p>Returned car</p>
                <select name="returnedCar" className='form-select' onChange={handleInput} value={inputSearch.returnedCar}>
                    <option value="">All</option>
                    <option value={true}>With finish rent</option>
                    <option value={false}>Without finish rent</option>
                </select>
            </div>
            <div className="form-group d-flex align-items-end">
                <button
                    className="btn btn-secondary"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <p 
                    style={{"cursor": "pointer"}}
                    onClick={handleResetSearch}
                    className='text-danger m-0 ms-3' 
                    >
                    Reset
                </p>
            </div>
        </div>
        <div>
        {renderFilters()}
        </div>
        </>
    );
}

export default SearchHistoryRented;