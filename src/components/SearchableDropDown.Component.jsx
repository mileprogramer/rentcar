import { useEffect, useRef, useState } from "react";
import "../css/drop-down.css"

const SearchableDropdown = ({ options, search, getData ,inputLabel, label, additionalLabel = null, validationErrors = [], id, selectedVal, handleChange }) => {

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        let searchableDropDown = document.querySelector(".dropdown input")
        searchableDropDown.addEventListener("input", toggle);
        return () =>{
            searchableDropDown.addEventListener("input", toggle);
            document.removeEventListener("click", toggle);
        };
    }, []);

    useEffect(()=>{
        if(!query){
            getData();
        }
    }, [query])

    const selectOption = (option) => {
        setQuery(() => "");
        handleChange(option);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (selectedVal) return selectedVal;

        return "";
    };

    const filter = (options) => {
        let results = options.filter(
            (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1 || option[additionalLabel].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
        if(results.length === 0){
            search(query);
        }
        return results;
    };

    return (
    <>
        <div className="dropdown">
            <label htmlFor="text">{inputLabel}</label>
            <div className="control">
                <div className="selected-value">
                    <input
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleChange(null);
                        }}
                        onClick={toggle}
                    />
                </div>
            <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>

            <div className={`options ${isOpen ? "open" : ""}`}>
            {filter(options).map((option, index) => {
                return (
                <div
                    onClick={() => selectOption(option)}
                    className={`option ${
                    option[label] === selectedVal ? "selected" : ""
                    }`}
                    key={`${id}-${index}`}
                >
                    {
                        additionalLabel ?
                        option[label] + "-" + option[additionalLabel] : option[label]
                    }
                </div>
                );
            })}
            </div>
        </div>
        {
            validationErrors.length !== 0 ? (
                <ul>
                    {validationErrors.map((el, index) => (
                        <li className="text-danger" key={index}>{el}</li>
                    ))}
                </ul>
            ) : ""
        }
    </>
    );
};

export default SearchableDropdown;
