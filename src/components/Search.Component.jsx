import React, {useState} from 'react';
import carService from "../services/carService";

function Search({setLoader, search, resetSearch}) {

    const [inputSearch, setInputSearch] = useState("");
    const [isSearched, setIsSearched] = useState(false);

    const handleSearch = (event)=>{
        carService.search(inputSearch)
            .then((cars)=>{
                search(cars);
                setIsSearched(true);
                setLoader(false);
            })
            .catch((error)=>{
                alert("Error happened mistake is: "+ error.message);
            })
    }

    const handleResetSearch = () =>{
        setIsSearched(false);
        setInputSearch("");
        resetSearch();
    }

    const handleInput = (event) =>{
        setInputSearch(event.target.value);
    }

    return (
        <div className="form-group d-flex gap-3 w-50">
            <input
                onChange={handleInput}
                value={inputSearch}
                type="search"
                className="form-control"
                placeholder="Type brand, model of car  for search"/>
            <button
                className="btn btn-primary w-100"
                onClick={handleSearch}
            >
                Search for
            </button>
            {isSearched &&
            <button
                className="form-control btn btn-danger"
                onClick={handleResetSearch}
            >
                Reset Search
            </button>}
        </div>
    );
}

export default Search;