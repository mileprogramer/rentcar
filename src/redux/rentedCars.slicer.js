import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

const rentedCarsSlicer = createSlice({
    name: "rentedCars",
    initialState: initialState,
    reducers: {
        saveCars(state, action) {
            if (action.payload.type === "searched") {
                state.value.searched = state.value.searched || {};
                state.value.searched[action.payload.page] = action.payload.cars;
            } else {
                state.value[action.payload.page] = action.payload.cars;
            }
        },

        savePaginationData(state, action) {
            if (action.payload.type === "searched") {
                state.value.searched = state.value.searched || {};
                state.value.searched.paginationData = action.payload.paginationData;
            } else {
                state.value.paginationData = action.payload.paginationData;
            }
        },

        setCurrentPage(state, action) {
            if (action.payload.type === "searched") {
                state.value.searched = state.value.searched || {};
                state.value.searched.currentPage = action.payload.page;
            } else {
                state.value.currentPage = action.payload.page;
            }
        },
    
        refreshFirstPage(state, action) {
            if (action.payload?.type === "searched") {
                state.value.searched[1] = null;
            } else {
                state.value[1] = null;
            }
        }
    }
});

// Selectors
export const selectCars = (state, page, type) => {
    let carsState = type === "searched" ? state.rentedCarsStore.value.searched : state.rentedCarsStore.value;
    if (carsState.hasOwnProperty(page)) {
        return carsState[page];
    }
    return null;
};

export const selectPaginationData = (state, type) => {
    return type === "searched" ? state.rentedCarsStore.value.searched.paginationData : state.rentedCarsStore.value.paginationData;
};

export const selectCurrentPage = (state, type) => {
    return type === "searched" ? state.rentedCarsStore.value.searched.currentPage : state.rentedCarsStore.value.currentPage;
};

export const selectShouldFetchNextPage = (state, type) => {
    let cars = type === "searched" ? state.rentedCarsStore.value.searched : state.rentedCarsStore.value;
    let nextPage = cars.currentPage + 1;
    if (!cars.hasOwnProperty(nextPage) || cars[nextPage]?.length === 9) {
        return true;
    }
    return false;
};

export const { 
    saveCars, 
    setCurrentPage, 
    savePaginationData, 
    refreshFirstPage 
} = rentedCarsSlicer.actions;
export default rentedCarsSlicer.reducer;
