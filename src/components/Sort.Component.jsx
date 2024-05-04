import React from 'react';

function Sort(props) {
    return (
        <select className="form-select w-50">
            <option value="0">Sort by...</option>
            <option value="price">Price asc</option>
            <option value="-price">Price desc</option>
            <option value="-taken"> Free cars </option>
            <option value="taken"> Taken cars </option>
        </select>
    );
}

export default Sort;