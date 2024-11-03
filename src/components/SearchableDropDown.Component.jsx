import { useState } from "react";
import Mistake from "../components/MistakesAlert.Component"
import "../css/drop-down.css"

export default function SearchableDropDown({ 
    options, 
    selectOption, 
    renderName, 
    resetSearch,  
    setSearchTerm, 
    inputValue, 
    setInputValue,
    validationErrors, 
    isLoading, 
    inputLabel 
}) {
    
    const [isOpen, setIsOpen] = useState("");

    const handleSearch = (e) => {
        setInputValue(e.target.value)
        if(e.target.value === "") {
            setIsOpen(false)
            resetSearch();
        }
        setSearchTerm(e.target.value);
        setIsOpen(true);

    }

    function displayOptions() {

        if(!Array.isArray(options)) {
            return "";
        }

        if(options.length > 0) {
            return options.map((option, index) => {
                return (
                    <div
                        onClick={() => {
                            selectOption(option)
                            setInputValue(renderName(option))
                            setIsOpen(false);
                            resetSearch();
                        }}
                        className={`option`}
                        key={`${index}`}
                    >
                        {renderName(option)}
                    </div>
                );
            })
        }
        else if(options.length === 0 && !isLoading) {
            return <div className="no-option">There is not result for this search</div> 
        }
        return "";
    }

    return <>
        <div className="dropdown">
            <label htmlFor="text">{inputLabel}</label>
            <div className="control">
                <div className="selected-value">
                    <input
                        type="input"
                        value={inputValue}
                        name="searchTerm"
                        onChange = {handleSearch}
                    />
                </div>
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>

            <div className={`options ${isOpen ? "open" : ""}`}> {displayOptions()} </div>
            <Mistake mistakes = {validationErrors} />
        </div>
    </>
}