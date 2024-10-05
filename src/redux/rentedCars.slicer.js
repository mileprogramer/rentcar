import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const rentedCarsSlicer = createSlice({
    name: "rentedCars",
    initialState: initialState,
    reducers : {

        saveCars(state, action){
            console.log(action.payload.page);
            console.log(action.payload.cars);
            state.value[action.payload.page] = action.payload.cars;
        },

        savePaginationData(state, action){
            state.value.paginationData = action.payload.paginationData;
        },

        setCurrentPage(state, action){
            state.value.currentPage = action.payload.page;
        },

        acceptCar(state, action){
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
            
        },

        refreshFirstPage(state, action){
            state.value[1] = null;
        }

    },
});

// selectors
export const selectCars = (state, page) =>  {
    if(state.rentedCarsStore.value.hasOwnProperty(page)){
        return state.rentedCarsStore.value[page];
    }
    return null;
};

export const selectPaginationData = (state) =>  {
    return state.rentedCarsStore.value.paginationData;
};

export const selectCurrentPage = (state) => {
    return state.rentedCarsStore.value.currentPage;
}

export const selectShouldFetchNextPage = (state) =>{
    let nextPage = state.rentedCarsStore.value.currentPage + 1;
    if(!state.rentedCarsStore.value.hasOwnProperty(nextPage) || state.rentedCarsStore.value[nextPage]?.length === 9){
        return true;
    }
    return false;
}

export const { 
    saveCars, 
    setCurrentPage, 
    savePaginationData, 
    setRentedCar, 
    setShouldFetchNextPage, 
    refreshFirstPage 
} = rentedCarsSlicer.actions;
export default rentedCarsSlicer.reducer;