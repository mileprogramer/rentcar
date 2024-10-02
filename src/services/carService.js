import axios from "axios";

class CarService {
    static defaultGetUrl = "http://127.0.0.1:8000/api/cars";
    static defaultPostUrl = "http://127.0.0.1:8000/api/car";

    static getCars(page) {
        const url = page ? `${this.defaultGetUrl}?page=${page}` : this.defaultGetUrl;
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

    static getRentedCars() {
        return axios.get(this.defaultGetUrl + "/rented")
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
        const url = page ? `${this.url}/history-rented?page=${page}` : `${this.url}/history-rented`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static getCar(id, license) {
        const criterium = id || license;
        return axios.get(`${this.url}/${criterium}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static updateCar(carInfo) {
        return axios.patch(`${this.url}/edit`, carInfo)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static deleteCar(license) {
        return axios.delete(`${this.defaultPostUrl}/delete`, license)
            .then(response => response.data)
            .catch(error => {
                Promise.reject(this.handleError(error));
            });
    }

    static acceptCar(carInfo) {
        return axios.post(`${this.url}/accept`, carInfo)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
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
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static bestSellingCars(numberOfCars) {
        return axios.get(`${this.url}/best-selling/${numberOfCars}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
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

    static searchRented(identifier) {
        return axios.get(`${this.defaultUrl}/search-rented/${identifier}`)
            .then(response => response.data)
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
                if(mistakes.hasOwnProperty(prop))
                {
                    mistakes[prop].push(data.errors[prop]);
                }
                else{
                    mistakes[prop] = [data.errors[prop]];
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

    static convertToSnakeCase(name){
        return name.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    }
}

export default CarService;
