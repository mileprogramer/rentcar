import React, {useEffect, useState} from 'react';

function Search({clearSearch, placeholder, search, label}) {

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
            search(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (event) => {
        if (event.target.value === "") {
            clearSearch();
        }
        setInputSearch(event.target.value);
    };

    const resetSearch = () =>{
        setInputSearch("");
        clearSearch();
    }

    return (
        <div className="form-group pe-4 ms-auto" style={{width: "320px"}}>
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