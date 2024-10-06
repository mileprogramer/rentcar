import React, {useState} from 'react';

function Search({setIsSearched, placeholder, getCarData}) {

    const [inputSearch, setInputSearch] = useState("");
    
    const handleSearch = (event) => {
        if(event.target.value === ""){
            setIsSearched(false);
        }
        setInputSearch(event.target.value);
        if(inputSearch.length < 3){
            return;
        }
        getCarData(inputSearch);
    }

    const resetSearch = () =>{
        setInputSearch("");
        setIsSearched(false);
    }

    return (
        <div className="form-group mt-3 pe-4 ms-auto" style={{width: "300px"}}>
            <input
                onChange={handleSearch}
                value={inputSearch}
                type="search"
                className="form-control"
                placeholder={placeholder}/>
            <div className='text-end'>
                <p
                    className='text-danger d-inline-block' 
                    style={{cursor: "pointer"}}
                    onClick={()=> resetSearch()}
                >
                    Reset search
                </p>
            </div>
        </div>
    );
}

export default Search;