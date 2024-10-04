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

            state.value[page] = cars.filter(car => car.id !== carId);

            if (cars.length === 10) {
                let nextPage = action.payload.page + 1;
                let beforePage = action.payload.page;
                
                while(state.value.hasOwnProperty(nextPage)){
                    state.value[beforePage].push(state.value[nextPage][0]);
                    state.value[nextPage] = state.value[nextPage].slice(1);
                    nextPage++;
                    beforePage++;
                }
            }
            
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

export const selectShouldFetchNextPage = (state) =>{
    let nextPage = state.carStore.value.currentPage + 1;
    if(!state.carStore.value.hasOwnProperty(nextPage) || state.carStore.value[nextPage]?.length === 9){
        return true;
    }
    return false;
}

export const { saveCars, setCurrentPage, savePaginationData, setRentedCar, setShouldFetchNextPage } = carSlicer.actions;
export default carSlicer.reducer;