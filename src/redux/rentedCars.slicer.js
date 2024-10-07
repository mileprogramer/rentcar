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

        returnCar(state, action) {
            let { carId, page } = action.payload;
            let carsState = state.value;
            if (action.payload.type === "searched") {
                carsState = state.value.searched || {};
            }

            carsState[page] = carsState[page].filter(car => car.id !== carId);

            if (carsState[page].length < 10) {
                let nextPage = page + 1;
                let beforePage = page;

                while (carsState.hasOwnProperty(nextPage) && carsState[nextPage].length > 0) {
                    carsState[beforePage].push(carsState[nextPage][0]);
                    carsState[nextPage] = carsState[nextPage].slice(1);
                    nextPage++;
                    beforePage++;
                }
            }
        },

        refreshFirstPage(state, action) {
            if (action.payload.type === "searched") {
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
    returnCar, 
    refreshFirstPage 
} = rentedCarsSlicer.actions;
export default rentedCarsSlicer.reducer;
