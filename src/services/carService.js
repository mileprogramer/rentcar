import modal from "bootstrap/js/src/modal";

class CarService {
    static allCars = [
        { id: 1, brand: 'Mercedes', model: 'G Class', year: 2005, pricePerDay: 150, airConditioner: true, available: true ,returnDate: '', license: 'CA1234567890' },
        { id: 2, brand: 'Toyota', model: 'Corolla', year: 2019, pricePerDay: 80, airConditioner: true, available: true ,returnDate: '', license: 'NY9876543210' },
        { id: 3, brand: 'Honda', model: 'Civic', year: 2020, pricePerDay: 90, airConditioner: true, available: true, returnDate: '', license: 'TX4567890123' },
        { id: 4, brand: 'Ford', model: 'Mustang', year: 2018, pricePerDay: 200, airConditioner: true, available: true, returnDate: '', license: 'FL2345678901' },
        { id: 5, brand: 'BMW', model: 'X5', year: 2017, pricePerDay: 180, airConditioner: true, available: true, returnDate: '', license: 'WA3456789012' },
        { id: 12, brand: 'Ford', model: 'Fiesta', year: 2002, pricePerDay: 30, airConditioner: false, available: true, returnDate: '', license: 'CA6789012345' },
        { id: 6, brand: 'Audi', model: 'A4', year: 2021, pricePerDay: 120, airConditioner: true, available: true, returnDate: '', license: 'MA7890123456' },
        { id: 7, brand: 'Lexus', model: 'RX 350', year: 2019, pricePerDay: 160, airConditioner: true, available: true, returnDate: '', license: 'NJ8901234567' },
        { id: 8, brand: 'Tesla', model: 'Model 3', year: 2022, pricePerDay: 250, airConditioner: true, available: true, returnDate: '', license: 'IL0123456789' },
        { id: 9, brand: 'Chevrolet', model: 'Camaro', year: 2016, pricePerDay: 190, airConditioner: true, available: true, returnDate: '', license: 'AZ3456789012' },
        { id: 10, brand: 'Subaru', model: 'Forester', year: 2019, pricePerDay: 110, airConditioner: true, available: true, returnDate: '', license: 'NV4567890123' },
        { id: 11, brand: 'Volvo', model: 'XC90', year: 2020, pricePerDay: 220, airConditioner: true, available: true, returnDate: '', license: 'GA5678901234' },
        { id: 13, brand: 'Fiat', model: 'Multipla', year: 2001, pricePerDay: 25, airConditioner: false, available: true, returnDate: '', license: 'OH6789012345' }
    ];

    // statsCars is history of all cars that were rented and returned
    static statsCars = [
        {license: "OH6789012345", startDate: "10.12.2022", returnDate: "15.12.2022", userRating: 4, userReview: ""},
        {license: "OH6789012345", startDate: "20.12.2024", returnDate: "1.1.2023", userRating: 4, userReview: ""},
        {license: "OH6789012345", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 4, userReview: ""},
        {license: "TX4567890123", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 4, userReview: ""},
        {license: "TX4567890123", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 2, userReview: ""},
        {license: "TX4567890123", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 3, userReview: ""},
        {license: "TX4567890123", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 1, userReview: ""},
        {license: "NY9876543210", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 4, userReview: ""},
        {license: "NY9876543210", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 5, userReview: ""},
        {license: "CA1234567890", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 3, userReview: ""},
        {license: "NY9876543210", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 5, userReview: ""},
        {license: "CA1234567890", startDate: "10.1.2023", returnDate: "20.1.2023", userRating: 3, userReview: ""},
    ]

    static rentedCars = [

    ]

    static getCars() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.allCars);
            }, 1000);
        });
    }
    static getCar(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.allCars.find((car,index)=>{return car.id === id}));
            }, 1000);
        });
    }

    static updateCar(updatedCar) {
        return new Promise((resolve, reject) => {
            const index = this.allCars.findIndex(car => car.id === updatedCar.id);
            if (index !== -1) {
                this.allCars[index] = { ...this.allCars[index], ...updatedCar };
                resolve(updatedCar);
            } else {
                reject(new Error('Car not found'));
            }
        });
    }

    static deleteCar(carId) {
        return new Promise((resolve, reject) => {
            const index = this.allCars.findIndex(car => car.id === carId);
            if (index !== -1) {
                this.allCars.splice(index, 1);
                resolve();
            } else {
                reject(new Error('Car not found'));
            }
        });
    }

    static addCar(carInfo){
        if(this.isSameLicense(carInfo.license) === true) return false;
        let modelCar = {
            license: carInfo.license,
            id: this.generateId(),
            brand: carInfo.brand,
            model: carInfo.model,
            year: carInfo.year,
            available: true,
            airConditioner: (carInfo.airConditioner === "true") ? true : false,
            pricePerDay: carInfo.price
        }
        this.allCars.push(modelCar);
        return true;
    }

    static rentCar = (carInfo) => {
        return new Promise((resolve, reject)=>{
            this.rentedCars.push(carInfo);
            let indexOfCar = null;
            this.allCars.find((car, index) =>{
                if(carInfo.license === car.license) indexOfCar = index;
            });
            this.allCars[indexOfCar].returnDate = carInfo.returnDate;
            this.allCars[indexOfCar].available = false;
            resolve(true);
        })
    }

    static bestSellingCars(numberOfCars){
        return new Promise((resolve, reject)=>{
            // iterating through this.statsCars to count how many of rented cars is?
            let stats = {};
            for(let i = 0; i<this.statsCars.length; i++){
                (stats.hasOwnProperty(this.statsCars[i].license) === false) ? stats[this.statsCars[i].license] = 1 : stats[this.statsCars[i].license]++;
            }
            // going through numbersOfCars to return user numbers he wants
            let returnCars = [];
            for(let i = 0; i<numberOfCars; i++){
                let max = 0;
                let carLicense = null;
                for(let license in stats){
                    if(stats[license] > max){
                        max = stats[license];
                        carLicense = license;
                    }
                }
                returnCars[i] = this.allCars.find((car)=>{return car.license === carLicense});
                stats[carLicense] = undefined;
            }
            resolve(returnCars);
        })
    }

    static sortCars(descOrAsc, criterium){
        let sortedCars = [...this.allCars];
        return new Promise((resolve, reject)=>{
            if(criterium === "reset") return resolve(this.allCars);
            if(this.allCars[0].hasOwnProperty(criterium) === false) reject("There is not such a property");
            if(descOrAsc === "desc"){
                sortedCars.sort(function(a,b){
                    if(a[criterium] > b[criterium]) return -1;
                    if(a[criterium] < b[criterium]) return +1;
                    if(a[criterium] === b[criterium]) return 0;
                });
                resolve(sortedCars);
                return "";
            }
            sortedCars.sort(function(a,b){
                if(a[criterium] > b[criterium]) return 1;
                if(a[criterium] < b[criterium]) return -1;
                if(a[criterium] === b[criterium]) return 0;
            })
            resolve(sortedCars);
        })
    }

    static generateId(){
        let max = this.allCars[0].id;
        for(let i = 1; i<this.allCars.length; i++){
            if(max < this.allCars[i].id){
                max = this.allCars[i].id;
            }
        }
        return ++max;
    }

    static isSameLicense(license){
        let carExist = this.allCars.find((car)=>{
            return car.license === license;
        })
        console.log(carExist);
        if(carExist === undefined) return false;
        return true;
    }

    static find(license){
        return new Promise( (resolve, reject)=>{
            resolve(this.allCars.find((car)=>{return car.license === license}));
        })
    }

}

export default CarService;
