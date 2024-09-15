import axios from "axios";

class CarService {
    static url = "http://localhost:8000/api/cars";

    static getCars(page) {
        const url = page ? `${this.url}?page=${page}` : this.url;
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

    static getRentedCars() {
        return axios.get(`${this.url}/rented`)
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
        return axios.delete(`${this.url}/delete`, { data: { license } })
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static acceptCar(carInfo) {
        return axios.post(`${this.url}/accept`, carInfo)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static addCar(carInfo) {
        const modelCar = {
            license: carInfo.license,
            brand: carInfo.brand,
            model: carInfo.model,
            year: carInfo.year,
            airConditioner: carInfo.airConditioner === "true",
            pricePerDay: carInfo.price
        };
        return axios.post(`${this.url}/add`, modelCar)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static editRent(data) {
        return axios.patch(`${this.url}/edit-rent`, data)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static rentCar(carInfo) {
        return axios.post(`${this.url}/rent`, carInfo)
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
        return axios.get(`${this.url}/search-rented/${identifier}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }

    static searchHistoryRented(data) {
        return axios.get(`${this.url}/search-history-rented/${data.license}/${data.startDate}/${data.endDate}`)
            .then(response => response.data)
            .catch(error => Promise.reject(this.handleError(error)));
    }
    
    static handleError(error) {
        if (error.response) {
            if (error.response.data.errors) {
                return {
                    message: error.response.data.message,
                    errors: error.response.data.errors
                };
            }
            return {
                message: error.response.data.message || 'An error occurred',
            };
        }
        return { message: error.message };
    }
}

export default CarService;
