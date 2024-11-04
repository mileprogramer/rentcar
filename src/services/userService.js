import axios from "axios";

export default class userService {
    static defaultUrl = "http://localhost:8000/api/users";
    static defaultPostUrl = "http://localhost:8000/api/user";

    static getUsers(page) {
        let url = page ? "?page=" + page : "";
        return axios.get(this.defaultUrl + url) 
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static search(searchTerm) {
        return axios.get(this.defaultUrl + "/search?search_term=" + searchTerm )
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static edit(data) {
        return axios.post(this.defaultPostUrl + "/edit", data)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static formatResponse(response){
        return {
            "users" : response.data.data, 
            "paginationData": {
                "currentPage": response.data.current_page,
                "firstPage": response.data.from,
                "lastPage": response.data.last_page,
                "totalElements" : response.data.total,
                "elementsPerPage" : response.data.per_page
            }
        };
    }

    static handleError(error){
        let mistakes = [];
        const errors = error.response?.data?.errors;
        if (errors) {
            Object.entries(errors).forEach(([field, messages]) => {
                mistakes = [...mistakes, ...messages];
            });
            return mistakes;
        }
        return error.code + ": " + error.message;
    }

}