import React, { useState } from 'react';
import ActiveFilters from './ActiveFilters.Components';
import dayjs from 'dayjs';
import { HandleInput } from '../helpers/functions';

function SearchHistoryRented({ search, clearSearch }) {

    const initialSearchData = {
        license: '',
        startDate: '',
        endDate: '',
        name: '',
        extendRent: "",
        returnedCar: "",
    };
    const [inputSearch, setInputSearch] = useState(initialSearchData);
    const [filters, setFilters] = useState([]);
    const handleInput = new HandleInput(setInputSearch, inputSearch);

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
        search(query);
    }

    const handleResetSearch = () => {
        clearSearch();
        setInputSearch(initialSearchData);
        setFilters([])
    }

    const formatFilters = () => {
        let copyFilters = {...filters};
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
        if(filters.length > 0){
            let copyFilters = formatFilters();
            return <ActiveFilters initialFiltersState={initialSearchData} filtersState={copyFilters} />
        }
        return "";
    }

    return (
        <>
        <div className="my-5 form-group d-flex gap-3 justify-content-end">
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