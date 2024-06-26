import React, {useEffect, useState} from 'react';
import carService from "../services/carService";

function Pagination({totalElements, elementsPerPage, getData, setCurrentPage, currentPage}) {

    const [isChangePage, setIsChangedPage] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    useEffect(() => {
        if(!isChangePage && isInitialLoad){
            return;
        }
        getData(currentPage);
    }, [currentPage]);

    if(totalElements <= elementsPerPage) return "";

    let numberOfPages = Math.ceil(parseInt(totalElements) / parseInt(elementsPerPage))
    let pages = [];
    for(let i = 1; i<=numberOfPages; i++){
        pages.push(i);
    }
    if(pages.length === 0){
        return "";
    }
    const handleNewPage = (event) =>{
        let nextPage = parseInt(event.target.name)
        if(nextPage && nextPage <= numberOfPages && nextPage >= 1){
            setIsChangedPage(true);
            setIsInitialLoad(false);
            setCurrentPage(nextPage);
        }
        else alert("There is no more pages");
    }

    const print = (value)=>{
        setTimeout(() => {
            console.log(value)
        }, 2000)
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
                            <button className={"page-link " + (currentPage === page ? "active" : "")}
                                    onClick={handleNewPage} name={page}>
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