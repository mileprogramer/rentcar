import axios from "axios";

class CarService {
    static defaultGetUrl = "http://127.0.0.1:8000/api/cars";
    static defaultSingularGetUrl = "http://127.0.0.1:8000/api/car";
    static defaultPostUrl = "http://127.0.0.1:8000/api/car";

    static getCars(page) {
        const url = page ? `${this.defaultGetUrl}?page=${page}` : this.defaultGetUrl;
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getAvailableCars(page) {
        const url = page ? `${this.defaultGetUrl}/available?page=${page}` : this.defaultGetUrl + "/available";
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getRentedCars(page) {
        return axios.get(this.defaultGetUrl + "/rented" + "?page="+ page)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getHistoryRented(page) {
        const url = page ? `${this.defaultGetUrl}/statistics?page=${page}` : `${this.defaultGetUrl}/statistics`;
        return axios.get(url)
            .then(response => this.formatStatsResponse(response))
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

    static extendRent(data) {
        return axios.post(`${this.defaultSingularGetUrl}/rent/extend`, data)
            .then(response => response.data)
            .catch(error => Promise.reject(error));
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

    static searchByLicense(license) {
        return axios.get(`${this.defaultSingularGetUrl}/show?license=${license}`)
            .then(response => response)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchAvailableCars(searchParam, page) {
        let url = `${this.defaultGetUrl}/available/search?term=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchAllCars(searchParam, page) {
        let url = `${this.defaultGetUrl}/search?term=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchRentedCars(searchParam, page) {
        let url = `${this.defaultGetUrl}/rented/search?term=${searchParam}`;
        if(page){
            url += "&page=" + page;
        }
        return axios.get(url)
            .then(response => this.formatResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchHistoryRented(query, page) {
        return axios.get(`${this.defaultGetUrl}/statistics/search${query}`)
            .then(response => this.formatStatsResponse(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getNumberOfAvaialableCars(){
        return axios.get(`${this.defaultGetUrl}/available/total`)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getNumberOfRentedCars(){
        return axios.get(`${this.defaultGetUrl}/rented/total`)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getNumOfRentedCarsMonth(){
        return axios.get(`${this.defaultGetUrl}/rented/total?month=true`)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getNumOfReturnedCarsMonth(){
        return axios.get(`${this.defaultGetUrl}/returned/total?month=true`)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getLatestRentedCars(){
        return axios.get(`${this.defaultGetUrl}/rented/latest`)
            .then(response => Promise.resolve(this.formatResponse(response)))
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getLatestReturnedCars(){
        return axios.get(`${this.defaultGetUrl}/returned/latest`)
            .then(response => Promise.resolve(this.formatResponse(response)))
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

    static formatStatsResponse(response){
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
