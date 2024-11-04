import { useState } from "react";
import CarService from "../services/carService";
import { useQuery } from "@tanstack/react-query";

export default function useFetchAvailableCars() {

    const [isSearched, setIsSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [searchedPage, setSearchedPage] = useState(1);

    const fetchCars = async (queryKey) => {
        
        if (isSearched) {
            const response = await CarService.searchAvailableCars(searchTerm, searchedPage);
            return response;
        } 
        else {
            const response = await CarService.getAvailableCars(page);
            return response;
        }
    };

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['availableCars', searchTerm, isSearched, page, searchedPage],
        queryFn: fetchCars,
        keepPreviousData: true,
        staleTime: 3000000,
    });

    const searchCars = (term) => {
        setIsSearched(true);
        setSearchTerm(term);
        setSearchedPage(1);
    };

    const changePage = (page) => {
        if(isSearched) {
            setSearchedPage(page);
            return;
        }
        setPage(page);
    }

    return {
        data,
        error,
        isError,
        isLoading,
        page,
        searchTerm,
        searchCars,
        changePage,
        setIsSearched,
    }

}