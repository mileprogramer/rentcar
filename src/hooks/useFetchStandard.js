import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function useFetchStandard({
    mainKey,
    fnForSearch,
    fnForGetSource,
    staleTime = 3000000,
    keepPreviousData = true,
}) {

    const [isSearched, setIsSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [searchedPage, setSearchedPage] = useState(1);

    const fetch = async () => {
        
        if (isSearched) {
            const response = await fnForSearch(searchTerm, searchedPage);
            return response;
        } 
        else {
            const response = await fnForGetSource(page);
            return response;
        }
    };

    const { data, error, isError, isLoading } = useQuery({
        queryKey: [mainKey, searchTerm, page, searchedPage],
        queryFn: fetch,
        keepPreviousData: keepPreviousData,
        staleTime: staleTime,
    });

    const searchFn = (term) => {
        setIsSearched(true);
        setSearchTerm(term);
        setSearchedPage(1);
    };

    const clearSearch = () => {
        setIsSearched(false); 
        setSearchTerm("");
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
        searchFn,
        changePage,
        clearSearch,
    }

}