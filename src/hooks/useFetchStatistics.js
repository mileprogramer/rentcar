import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import carService from "../services/carService";
import { cacheNames } from "../config/cache"
 
export default function useFetchStatistics(props) {

    const [isSearched, setIsSearched] = useState(false);
    const [filters, setFilters] = useState("");
    const [page, setPage] = useState(1);
    const [searchedPage, setSearchedPage] = useState(1);

    const fetch = async () => {
        
        if (isSearched) {
            const response = await carService.searchHistoryRented(filters + "&page=" + searchedPage);
            return response;
        } 
        else {
            const response = await carService.getHistoryRented(page);
            return response;
        }
    };

    const { data, error, isError, isLoading } = useQuery({
        queryKey: [cacheNames.statistics, filters, page, searchedPage],
        queryFn: fetch,
        keepPreviousData: !isSearched,
        staleTime: 3000000,
    });

    const searchFn = (filters) => {
        setIsSearched(true);
        setFilters(filters);
        setSearchedPage(1);
    };

    const clearSearch = () => {
        setIsSearched(false); 
        setFilters("");
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
        filters,
        searchFn,
        changePage,
        clearSearch,
    }

}