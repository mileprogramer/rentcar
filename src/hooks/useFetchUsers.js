import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import userService from "../services/userService";

export default function useFetchUsers() {

    const [isSearched, setIsSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [searchedPage, setSearchedPage] = useState(1);

    const fetchUsers = async (queryKey) => {
        
        if (isSearched) {
            const response = await userService.search(searchTerm, searchedPage);
            return response;
        } 
        else {
            const response = await userService.getUsers(page);
            return response;
        }
    };

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['users', searchTerm, isSearched, page, searchedPage],
        queryFn: fetchUsers,
        keepPreviousData: true,
        staleTime: 3000000,
    });

    const searchUsers = (term) => {
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
        searchUsers,
        changePage,
        setIsSearched,
    }


}