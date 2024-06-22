import React from 'react';
import carService from "../services/carService";

function Pagination({totalElements, elementsPerPage, setCars, setLoader}) {

    let numberOfPages = Math.floor(parseInt(totalElements) / parseInt(elementsPerPage))
    let pages = [];
    for(let i = 1; i<=numberOfPages; i++){
        pages.push(i);
    }
    if(pages.length === 0){
        return "";
    }
    const handleRequest = (page) =>{
        carService.getCars(page)
            .then((data)=>{
                setCars(data.cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                alert(error);
            })
    }

    const handleNewPage = (event) =>{
        let page = event.target.name;
        handleRequest(page);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link">Previous</button>
                </li>
                {
                    pages.map((page, index) => {
                        return <li key={index} className="page-item">
                            <button className="page-link" onClick={handleNewPage} name={page}>
                                {page}
                            </button>
                        </li>
                    })
                }
                <li className="page-item">
                    <button className="page-link">Previous</button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;