import React, {useEffect, useState} from 'react';

function Search({setIsSearched, placeholder, getCarData, label ,widthOfSearch = "300"}) {

    const [inputSearch, setInputSearch] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(inputSearch);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(inputSearch);
        }, 500); 

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]); 

    useEffect(() => {
        if (debouncedSearchTerm) {
            getCarData(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (event) => {
        if (event.target.value === "") {
            setIsSearched(() => false);
        }
        setInputSearch(event.target.value);
    };

    const resetSearch = () =>{
        setInputSearch("");
        setIsSearched(() => false);
    }

    return (
        <div className="form-group pe-4 ms-auto" style={{width: widthOfSearch + "px"}}>
            {
                label && <label htmlFor='search'>{ label }</label> 
            }
            <input
                onChange={handleSearch}
                value={inputSearch}
                type="search"
                className="form-control"
                placeholder={placeholder}/>
            <div className='text-end'>
                <p
                    className='pt-1 text-danger d-inline-block' 
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