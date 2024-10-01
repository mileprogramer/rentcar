import React, {useState} from 'react';
import carService from "../services/carService";


function Search({setLoader, setIsSearched}) {

    const [inputSearch, setInputSearch] = useState("");

    const handleSearch = (event) => {
        if(inputSearch.length < 3){
            return;
        }
        setLoader(true);
        getCarData();
    }

    function getCarData(page = 1){
        carService.search(inputSearch)
            .then((data)=>{
                setLoader(false);
            })
            .catch((error)=>{
                alert("Error happened mistake is: "+ error.message);
            })
    }

    const resetSearch = () =>{
        setInputSearch("");
        setIsSearched(false);
    }

    return (
        <div className="form-group mt-3 ml-auto">
            <input
                onChange={handleSearch}
                value={inputSearch}
                type="search"
                className="form-control"
                placeholder="Type brand, model of car, license"/>
            <p className='text-danger'
                onClick={()=> resetSearch()}
                >Reset search</p>
        </div>
    );
}

export default Search;