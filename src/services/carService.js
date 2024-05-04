class CarService {
    static allCars = [
        { id: 1, brand: 'Mercedes', model: 'G Class', year: 2005, pricePerDay: 150, airConditioner: true, available: false, returnDate: '12.6.2024' },
        { id: 2, brand: 'Toyota', model: 'Corolla', year: 2019, pricePerDay: 80, airConditioner: true, available: true, returnDate: '' },
        { id: 3, brand: 'Honda', model: 'Civic', year: 2020, pricePerDay: 90, airConditioner: true, available: true, returnDate: '' },
        { id: 4, brand: 'Ford', model: 'Mustang', year: 2018, pricePerDay: 200, airConditioner: true, available: true, returnDate: '' },
        { id: 5, brand: 'BMW', model: 'X5', year: 2017, pricePerDay: 180, airConditioner: true, available: true, returnDate: '' },
        { id: 12, brand: 'Ford', model: 'Fiesta', year: 2002, pricePerDay: 30, airConditioner: false, available: false, returnDate: '10.6.2024' },
        { id: 6, brand: 'Audi', model: 'A4', year: 2021, pricePerDay: 120, airConditioner: true, available: true, returnDate: '' },
        { id: 7, brand: 'Lexus', model: 'RX 350', year: 2019, pricePerDay: 160, airConditioner: true, available: true, returnDate: '' },
        { id: 8, brand: 'Tesla', model: 'Model 3', year: 2022, pricePerDay: 250, airConditioner: true, available: true, returnDate: '' },
        { id: 9, brand: 'Chevrolet', model: 'Camaro', year: 2016, pricePerDay: 190, airConditioner: true, available: true, returnDate: '' },
        { id: 10, brand: 'Subaru', model: 'Forester', year: 2019, pricePerDay: 110, airConditioner: true, available: true, returnDate: '' },
        { id: 11, brand: 'Volvo', model: 'XC90', year: 2020, pricePerDay: 220, airConditioner: true, available: true, returnDate: '' },
        { id: 12, brand: 'Fiat', model: 'Multipla', year: 2001, pricePerDay: 25, airConditioner: false, available: false, returnDate: '' }
    ];


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
        let modelCar = {
            id: parseInt(carInfo.id),
            brand: carInfo.brand,
            model: carInfo.model,
            year: carInfo.year,

        }
    }
}

export default CarService;
