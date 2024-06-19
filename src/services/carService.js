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

    static getHistoryRented() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.url+"/history-rented");
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

    static editRent = (data) =>{
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("PATCH", this.url+"/edit-rent");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(data));
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
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars/best-selling/${numberOfCars}`);
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

    static searchRented(identifier){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars/search-rented/${identifier}`);
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

    static searchHistoryRented(data){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3030/api/cars//search-history-rented/${data.license}/${data.startDate}/${data.endDate}`);
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
}

export default CarService;
