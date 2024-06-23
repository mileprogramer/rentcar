import React, {useState} from 'react';
import carService from "../services/carService";

function Pagination({totalElements, elementsPerPage, setCars, setLoader}) {
    const [currentPage, setCurrentPage] = useState(0);

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
                setCurrentPage(page);
                setCars(data.cars);
                setLoader(false);
            })
            .catch((error)=>{
                setLoader(false);
                alert(error);
            })
    }

    const handleNewPage = (event) =>{
        let nextPage = parseInt(event.target.name)
        if(nextPage && nextPage <= numberOfPages && nextPage >= 1){
            handleRequest(nextPage);
        }
        else alert("There is no more pages");
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button
                        name = {currentPage-1}
                        className="page-link"
                        onClick={handleNewPage}
                    >
                        Previous
                    </button>
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
                    <button
                        name = {currentPage + 1}
                        className="page-link"
                        onClick={handleNewPage}
                    >Next</button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;