import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const carSlicer = createSlice({
    name: "cars",
    initialState: initialState,
    reducers : {
        saveCars(state, action){
            state.value[action.payload.page] = action.payload.cars;
        },

        savePaginationData(state, action){
            state.value.paginationData = action.payload.paginationData;
        },

        setCurrentPage(state, action){
            state.value.currentPage = action.payload.page;
        },

        setRentedCar(state, action){
            let { carId, page } = action.payload;
            let cars = state.value[page] || [];

            let updatedCars = cars.filter(car => car.id !== carId);
            let nextPage = page + 1;
            if (cars.length === 10) {
                let nextPageCars = state.value[nextPage]; // could be undefined if the next page is not cached  
                
                if(nextPageCars?.length === 0){
                    // if there is not cars on that page remove it from pagination
                    state.value.paginationData.lastPage--;
                }

                if (nextPageCars?.length > 0) {
                    updatedCars.push(nextPageCars[0]);
                    state.value[nextPage] = nextPageCars.slice(1);
                }
            }
            
            state.value[page] = updatedCars;
        }
    },
});

// selectors
export const selectCars = (state, page) =>  {
    if(state.carStore.value.hasOwnProperty(page)){
        return state.carStore.value[page];
    }
    return null;
};

export const selectPaginationData = (state) =>  {
    return state.carStore.value.paginationData;
};

export const selectCurrentPage = (state) => {
    return state.carStore.value.currentPage;
}

export const selectCarData = (state, license, fromPage) => {
    if(state.carStore.value[fromPage])
        return state.carStore.value[fromPage].find(car => car.license === license);

    return null;
}


export const { saveCars, setCurrentPage, savePaginationData, setRentedCar } = carSlicer.actions;
export default carSlicer.reducer;