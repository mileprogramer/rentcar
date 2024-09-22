import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const carSlicer = createSlice({
    name: "cars",
    initialState: initialState,
    reducers : {
        saveCars(state, action){
            state.value[action.payload.page] = action.payload.cars;
        },

        setCurrentPage(state, action){
            state.value.currentPage = action.payload.page;
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

export const selectCurrentPage = (state) => {
    return state.carStore.value.currentPage;
}

export const selectCarData = (state, license, fromPage) => {
    return state.carStore.value[fromPage].find(car => car.license === license);
}


export const { saveCars, setCurrentPage } = carSlicer.actions;
export default carSlicer.reducer;