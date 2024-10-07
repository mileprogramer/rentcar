import axios from "axios";

class CarService {
    static defaultGetUrl = "http://127.0.0.1:8000/api/cars";
    static defaultPostUrl = "http://127.0.0.1:8000/api/car";

    static getCars(page) {
        const url = page ? `${this.defaultGetUrl}?page=${page}` : this.defaultGetUrl;
        return axios.get(url)
            .then(response => {
                return {
                    "cars" : response.data.data, 
                    "paginationData": {
                        "currentPage": response.data.current_page,
                        "firstPage": response.data.from,
                        "lastPage": response.data.last_page,
                        "totalElements" : response.data.total,
                        "elementsPerPage" : response.data.per_page
                    }
                };
            })
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getAvailableCars(page) {
        const url = page ? `${this.defaultGetUrl}/available?page=${page}` : this.defaultGetUrl + "/available";
        return axios.get(url)
            .then(response => {
                return {
                    "apiEndpoint": response.request.responseURL,
                    "cars" : response.data.data, 
                    "paginationData": {
                        "currentPage": response.data.current_page,
                        "firstPage": response.data.from,
                        "lastPage": response.data.last_page,
                        "totalElements" : response.data.total,
                        "elementsPerPage" : response.data.per_page
                    }
                };
            })
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getRentedCars(page) {
        return axios.get(this.defaultGetUrl + "/rented" + "?page="+ page)
            .then(response => {
                return {
                    "cars" : response.data.data, 
                    "paginationData": {
                        "currentPage": response.data.current_page,
                        "firstPage": response.data.from,
                        "lastPage": response.data.last_page,
                        "totalElements" : response.data.total,
                        "elementsPerPage" : response.data.per_page
                    }
                }
            })
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getHistoryRented(page) {
        const url = page ? `${this.defaultGetUrl}/statistics?page=${page}` : `${this.defaultGetUrl}/statistics`;
        return axios.get(url)
            .then(response => {
                return {
                    "stats" : response.data.data, 
                    "paginationData": {
                        "currentPage": response.data.current_page,
                        "firstPage": response.data.from,
                        "lastPage": response.data.last_page,
                        "totalElements" : response.data.total,
                        "elementsPerPage" : response.data.per_page
                    }
                }
            })
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getCar(id, license) {
        const criterium = id || license;
        return axios.get(`${this.url}/${criterium}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static updateCar(carInfo) {
        return axios.post(`${this.defaultPostUrl}/update`, carInfo)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static deleteCar(data) {
        return axios.post(`${this.defaultPostUrl}/delete`, data)
            .then(response => response.data)
            .catch(error => {
                return Promise.reject(this.getErrorsMessages(error.response.data));
            });
    }

    static acceptCar(carInfo) {
        return axios.post(`${this.defaultPostUrl}/rent/return`, carInfo)
            .then(response => response.data)
            .catch(error => Promise.reject(this.getErrorsMessages(error.response.data)));
    }

    static addCar(carData) {
        return axios.post(`${this.defaultPostUrl}/add`, carData)
            .then(response => response.data)
            .catch(error => {
                return Promise.reject(this.getErrorsMessages(error.response.data));
            });
    }

    static editRent(data) {
        return axios.patch(`${this.url}/edit-rent`, data)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static rentCar(rentCarData) {
        return axios.post(`${this.defaultPostUrl}/rent`, rentCarData, {
            "headers": {
                "Content-type": 'application/json'
            }})
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error.response.data)));
    }

    static sortCars(query) {
        return axios.get(`${this.url}/sort${query}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static search(searchParam) {
        return axios.get(`${this.url}/search/${searchParam}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchAvailableCars(searchParam, page) {
        let url = `${this.defaultGetUrl}/available?search=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchAllCars(searchParam, page) {
        let url = `${this.defaultGetUrl}?search=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchRentedCars(searchParam, page) {
        let url = `${this.defaultGetUrl}/rented?search=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchHistoryRented(data) {
        return axios.get(`${this.url}/search-history-rented/${data.license}/${data.startDate}/${data.endDate}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }
    
    static handleError(data) {
        let mistakes = [];
        if (data?.errors) {
            for(let prop in data.errors)
            {
                let propToCamelCase = this.convertToCamelCase(prop);

                if(mistakes.hasOwnProperty(prop)){
                    mistakes[propToCamelCase].push(data.errors[prop]);
                }
                else{
                    mistakes[propToCamelCase] = [data.errors[prop]];
                }
            }
        }
        return mistakes;
    }

    static getErrorsMessages(data){
        let mistakes = [];
        if (data?.errors) {
            for(let prop in data.errors)
            {
                mistakes.push(data.errors[prop]);
            }
        }
        return mistakes;
    }

    static convertToCamelCase(str){
        return str.toLowerCase().replace(/_([a-z])/g, function(match, letter) {
            return letter.toUpperCase();
        });
    }

    static formatResponse(response){
        return {
            "cars" : response.data.data, 
            "paginationData": {
                "currentPage": response.data.current_page,
                "firstPage": response.data.from,
                "lastPage": response.data.last_page,
                "totalElements" : response.data.total,
                "elementsPerPage" : response.data.per_page
            }
        };
    }
}

export default CarService;
