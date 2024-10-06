import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const carSlicer = createSlice({
    name: "cars",
    initialState: initialState,
    reducers : {
        saveCars(state, action){
            if(action.payload.type === "searched"){
                state.value.searched[action.payload.page] = action.payload.cars;
            }
            else 
                state.value[action.payload.page] = action.payload.cars;
        },

        savePaginationData(state, action){
            if(action.payload.type === "searched"){
                state.value.searched.paginationData = action.payload.paginationData;
            }
            else 
                state.value.paginationData = action.payload.paginationData;
        },

        setCurrentPage(state, action){
            if(action.payload.type === "searched"){
                state.value.searched = state.value.searched || {};
                state.value.searched.currentPage = action.payload.page;
            }
            else 
                state.value.currentPage = action.payload.page;
        },

        setRentedCar(state, action){
            let { carId, page } = action.payload;
            let carsState = state.value;
            if(action.payload.type === "searched"){
                carsState = state.value.searched || {};
            }

            carsState[page] = carsState[page].filter(car => car.id !== carId);

            if (carsState[page].length < 10) {
                let nextPage = action.payload.page + 1;
                let beforePage = action.payload.page;
                
                while(carsState.hasOwnProperty(nextPage) && carsState[nextPage].length > 0){
                    carsState[beforePage].push(carsState[nextPage][0]);
                    carsState[nextPage] = carsState[nextPage].slice(1);
                    nextPage++;
                    beforePage++;
                }
            }
        }

    },
});

// selectors
export const selectCars = (state, page, type) =>  {
    let carsState = type === "searched" ? state.carStore.value.searched : state.carStore.value;
    if(carsState.hasOwnProperty(page)){
        return carsState[page];
    }
    return null;
};

export const selectPaginationData = (state, type) =>  {
    return type === "searched" ? state.carStore.value.searched.paginationData : state.carStore.value.paginationData;
};

export const selectCurrentPage = (state, type) => {
    return type === "searched" ? state.carStore.value.searched.currentPage : state.carStore.value.currentPage;
}

export const selectCarData = (state, license, fromPage, type) => {
    let cars = type === "searched" ? state.carStore.value.searched : state.carStore.value;
    if(cars[fromPage])
        return cars[fromPage].find(car => car.license === license);

    return null;
}

export const selectShouldFetchNextPage = (state, type) =>{
    let cars = type === "searched" ? state.carStore.value.searched : state.carStore.value;
    let nextPage = cars.currentPage + 1;
    if(!cars.hasOwnProperty(nextPage) || cars[nextPage]?.length === 9){
        return true;
    }
    return false;
}

export const { saveCars, setCurrentPage, savePaginationData, setRentedCar, setShouldFetchNextPage } = carSlicer.actions;
export default carSlicer.reducer;