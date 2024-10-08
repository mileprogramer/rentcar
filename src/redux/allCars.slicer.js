import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

const carSlicer = createSlice({
    name: "allCars",
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

        editCar(state, action) {
            const carsState = action.payload.type === "searched" ? state.value.searched : state.value;
            carsState[action.payload.page] = carsState[action.payload.page].map((car) => {
                if (car.id === action.payload.car.id) {
                    return action.payload.car;
                }
                return car;
            });
        },

        deleteCar(state, action) {
            const { page, type } = action.payload;
            const carsState = type === "searched" ? state.value.searched : state.value;

            carsState[page] = carsState[page].filter((car) => car.id !== action.payload.car.id);
            
            let nextPage = page + 1;
            let beforePage = page;

            while (carsState.hasOwnProperty(nextPage) && carsState[nextPage].length > 0) {
                carsState[beforePage].push(carsState[nextPage][0]);
                carsState[nextPage] = carsState[nextPage].slice(1);
                nextPage++;
                beforePage++;
            }
        },
    },
});

// selectors
export const selectCars = (state, page, type) => {
    const carsState = type === "searched" ? state.allCarsStore.value.searched : state.allCarsStore.value;
    return carsState.hasOwnProperty(page) ? carsState[page] : null;
};

export const selectPaginationData = (state, type) => {
    return type === "searched" ? state.allCarsStore.value.searched?.paginationData : state.allCarsStore.value.paginationData;
};

export const selectCurrentPage = (state, type) => {
    return type === "searched" ? state.allCarsStore.value.searched?.currentPage : state.allCarsStore.value.currentPage;
};

export const selectCarData = (state, license) =>{
    let page = 1;
    while(state.allCarsStore.value.hasOwnProperty(page)){
        let car = state.allCarsStore.value[page].find(car => car.license === license);
        if(car !== undefined){
            return car;
        }
    }
    return null;
}

export const selectShouldFetchNextPage = (state, type) => {
    const carsState = type === "searched" ? state.allCarsStore.value.searched : state.allCarsStore.value;
    const nextPage = carsState?.currentPage + 1;
    return !carsState?.hasOwnProperty(nextPage) || carsState[nextPage]?.length === 9;
};

export const { saveCars, setCurrentPage, savePaginationData, deleteCar, editCar } = carSlicer.actions;
export default carSlicer.reducer;
