import React, {useState} from 'react';
import carService from "../services/carService";

function Search({setLoader, search, resetSearch}) {

    const [inputSearch, setInputSearch] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [mistakes, setMistakes] = useState([]);

    const handleSearch = (event)=>{
        if(inputSearch.length < 3){
            return setMistakes([{"message":"Search term must be at least 3 letters"}]);
        } else  setMistakes([])
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
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
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