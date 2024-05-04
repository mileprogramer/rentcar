import React from 'react';

function Search(props) {
    return (
        <div className="form-group d-flex gap-3 w-50">
            <input type="text" className="form-control" placeholder="Type brand, model of car  for search"/>
            <button className="btn btn-primary w-100">Search for</button>
        </div>
    );
}

export default Search;