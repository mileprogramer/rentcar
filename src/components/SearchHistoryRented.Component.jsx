import React, {useState} from 'react';
import carService from "../services/carService";
import FormValidation from "../services/FormValidation";

function SearchHistoryRented({search, resetSearch, setLoader}) {
    const [inputSearch, setInputSearch] = useState({
        license: '',
        startDate: '',
        endDate: ''
    });
    const [isSearched, setIsSearched] = useState(false);
    const [mistakes, setMistakes] = useState([]);

    const handleSearch = (event)=>{
        let mistakes = FormValidation.validateInputFields(inputSearch);
        if(mistakes.length !== 0){
            setMistakes(mistakes);
            return;
        } else setMistakes([]);
        carService.searchHistoryRented(inputSearch)
            .then((data)=>{
                search(data);
                setIsSearched(true);
                setLoader(false);
            })
            .catch((error)=>{
                alert("Error happened mistake is: "+ error.message);
            })
    }

    const handleResetSearch = () =>{
        setIsSearched(false);
        setInputSearch({
            license: '',
            startDate: '',
            endDate: ''
        });
        resetSearch();
    }

    const handleInput = (event) =>{
        const { name, value } = event.target;
        setInputSearch({
            ...inputSearch,
            [name]: value
        });
    }

    return (
        <div className="my-5 form-group d-flex gap-3 w-75">
            {mistakes.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {mistakes.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
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
            <div className="form-group mt-auto d-flex gap-1">
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
        </div>
    );
}

export default SearchHistoryRented;