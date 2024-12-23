import axios from "axios";
import { hostname } from "../config/globals";

export default class userService {

    static defaultUrl = hostname + "api/users";
    static defaultPostUrl = hostname + "api/user";

    static getUsers(page) {
        let query = page ? "?page=" + page : "";
        return axios.get(this.defaultUrl + query) 
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

    static getCookies() {
        return axios.get(hostname + "sanctum/csrf-cookie")
            .then(response => response)
            .catch(response => Promise.reject(response))
    }

    static loginAdmin(loginData) {
        return axios.post(hostname + "api/admin/login", loginData)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    static logoutAdmin() {
        return axios.post(hostname + "api/admin/logout")
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    static checkAuthStatus() {
        return axios.get(hostname + "api/admin/logged")
            .then(response => response)
            .catch(error => error)
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