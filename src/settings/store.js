import allCarsSlicer from "../redux/allCars.slicer";
import carSlicer from "../redux/car.slicer";
import userSlicer from "../redux/user.slicer";

const storeOptions  = {

    carStore: carSlicer,
    userStore: userSlicer,
    allCarsStore: allCarsSlicer,

};

export default storeOptions;