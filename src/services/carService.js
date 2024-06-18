class CarService {
    static url = "http://localhost:3030/api/cars";

    static getCars() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.url);
            xhr.send();
            xhr.addEventListener("readystatechange", ()=>{
               if(xhr.readyState === 4 && xhr.status === 200)
               {
                   resolve(JSON.parse(xhr.responseText));
               }
               else if(xhr.readyState === 4)
               {
                   reject("Error happened Status code: "+ xhr.status+ " text of mistake is: " + xhr.responseText)
               }
            });
        });
    }

    static getRentedCars(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.url+"/rented");
            xhr.send();
            xhr.addEventListener("readystatechange", ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject("Error happened Status code: "+ xhr.status+ " text of mistake is: " + xhr.responseText)
                }
            });
        });
    }

    static getCar(id, license) {
        let criterium = id || license;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars/${criterium}`);
            xhr.send();
            xhr.addEventListener("readystatechange", function (){
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject("Error happened "+ xhr.status+ " " + xhr.responseText)
                }
            });
        });
    }

    static updateCar(carInfo) {
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("PATCH", this.url+"/edit");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(carInfo));
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })
    }

    static deleteCar(license) {
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", this.url+"/delete");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify({"license": license}));
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })
    }

    static acceptCar(carInfo){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url+"/accept");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(carInfo));
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })
    }

    static addCar(carInfo){
        return new Promise((resolve, reject)=>{
            let modelCar = {
                license: carInfo.license,
                brand: carInfo.brand,
                model: carInfo.model,
                year: carInfo.year,
                airConditioner: (carInfo.airConditioner === "true") ? true : false,
                pricePerDay: carInfo.price
            }
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url+"/add");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(modelCar));
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })

    }

    static rentCar = (carInfo) => {
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url+"/rent");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(carInfo));
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })
    }

    static addPriceAndDays(license){
        return new Promise((resolve, reject)=>{
            let car = this.rentedCars.find((car, index) =>{
                return car.license === license
            });
            if(car === undefined) reject(new Error("No car with that license"))
            let carPrice = null;
            this.allCars.forEach((car, index) =>{
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

    static sortCars(query){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars/sort${query}`);
            xhr.send();
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
        })
    }

    static search(searchParam){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars/search/${searchParam}`);
            xhr.send();
            xhr.addEventListener("readystatechange",  ()=>{
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }
                else if(xhr.readyState === 4)
                {
                    reject(JSON.parse(xhr.responseText))
                }
            });
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
}

export default CarService;
