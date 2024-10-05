import allCarsSlicer from "../redux/allCars.slicer";
import carSlicer from "../redux/car.slicer";
import statisticsSlicer from "../redux/statistics.slicer";
import userSlicer from "../redux/user.slicer";
import rentedCarsSlicer from "../redux/rentedCars.slicer";

const storeOptions  = {

    carStore: carSlicer,
    userStore: userSlicer,
    allCarsStore: allCarsSlicer,
    statisticsStore: statisticsSlicer,
    rentedCarsStore: rentedCarsSlicer

};

export default storeOptions;