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
    static getCar(id, license) {
        return new Promise((resolve, reject) => {
            if(id){
                let res = this.allCars.find((car,index) =>{
                    if(car.id === id) return car;
                })
                if(!res) reject(new Error("NO car with that id or license"));
                resolve(res);
            }
            else{
                let res = this.allCars.find((car,index) =>{
                    if(car.license === license) return car;
                })
                if(!res) reject(new Error("NO car with that id or license"));
                resolve(res);
            }
        });
    }

    static updateCar(license, carInfo) {
        return new Promise(async (resolve, reject) => {
            let car = await this.getCar(null, license);
            let positionOfCar = await this.findIndex(car.license);
            this.allCars[positionOfCar] = carInfo;
            resolve(true);
        });
    }

    static deleteCar(id, license) {
        return new Promise(async (resolve, reject) => {
            if(id){
                this.allCars = this.allCars.filter((car, index)=>{
                    return car.id !== id
                })
                return resolve(true);
            }
            else{
                this.allCars = this.allCars.filter((car, index)=>{
                    return car.license !== license
                })
                return resolve(true);
            }
        });
    }

    static acceptCar(carInfo){
        return new Promise((resolve, reject)=>{
            this.statsCars.push(carInfo);
            let indexOfCar = null;
            this.allCars.find((car, index) =>{
                if(carInfo.license === car.license) indexOfCar = index;
            });
            this.allCars[indexOfCar].returnDate = "";
            this.allCars[indexOfCar].available = true;
            resolve(true);
        })
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

    static addPriceAndDays(license){
        return new Promise((resolve, reject)=>{
            let car = this.rentedCars.find((car, index) =>{
                return car.license === license
            });
            if(car === undefined) reject(new Error("No car with that license"))
            let carPrice = null;
            this.allCars.find((car, index) =>{
                if(car.license === license) carPrice = parseInt(car.pricePerDay);
            });
            let daysOfUsing = this.calculateDateDiff(car.startDate, car.returnDate);
            let startDate = car.startDate;
            let returnDate = car.returnDate;
            resolve({daysOfUsing, startDate, returnDate, carPrice});
        })
    }

    static averageRating(license){
        return new Promise((resolve, reject)=>{
            let sum = 0;
            let allRatings = 0;
            for(let i = 0; i<this.statsCars.length; i++){
                if(this.statsCars[i].license === license){
                    sum+= this.statsCars[i].userRating;
                    allRatings++;
                }
            }
            if(sum === 0) return resolve(0);
            let result = sum / allRatings;
            resolve(result.toFixed(2));
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
        if(carExist === undefined) return false;
        return true;
    }

    static find(license){
        return new Promise( (resolve, reject)=>{
            resolve(this.allCars.find((car)=>{return car.license === license}));
        })
    }

    static calculateDateDiff(date1, date2){
        const [year1, month1, day1] = date1.split('-').map(Number);
        const [year2, month2, day2] = date2.split('-').map(Number);

        const date1Date = new Date(year1, month1 - 1, day1);
        const date2Date = new Date(year2, month2 - 1, day2);

        const diffInMs = date2Date.getTime() - date1Date.getTime();

        return  Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }

    static findIndex(license) {
        return new Promise((resolve, reject)=>{
            let index = null;
            for(let i = 0; i<this.allCars.length; i++){
                if(this.allCars[i].license === license){
                    index = i;
                }
            }
            resolve(index)
        })
    }
}

export default CarService;
