import React from 'react'
import "../css/filter-badge.css"

export default function ActiveFilters({ initialFiltersState, filtersState }) {
    
    const activeFilters = [];

    for(let prop in initialFiltersState){
        if(initialFiltersState[prop] !== filtersState[prop]){
            let formatedProp = normalCase(prop);
            activeFilters.push({ prop: filtersState[prop], formatedProp });
        }
    }

    function normalCase(string){
        string = string.replace(/_/g, ' ');
        string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className='d-flex gap-4 mb-3'>
            <h3>Filters:</h3>
        {    
            activeFilters.map((filter, index) => {
                
                return (
                    <div
                        className='filter-badge position-relative' 
                        key={index}
                        name ={filter.prop}
                    >
                        {filter.formatedProp} : {filter.prop}
                    </div>
                )
        })
        }
        </div>
    );
}
