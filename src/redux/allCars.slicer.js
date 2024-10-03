import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const carSlicer = createSlice({
    name: "allCars",
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

        editCar(state, action){
            state.value[action.payload.page] = 
            state.value[action.payload.page].map(car => {
                if(car.id === action.payload.car.id){
                    return action.payload.car;
                }
                return car;
            });
        },

        deleteCar(state, action){
            state.value[action.payload.page] = 
            state.value[action.payload.page].filter(car => car.id !== action.payload.car.id);
            let nextPage = action.payload.page + 1;
            let beforePage = action.payload.page;
            while(state.value.hasOwnProperty(nextPage)){
                state.value[beforePage].push(state.value[nextPage][0]);
                state.value[nextPage].slice(1);
                nextPage++;
            }
        }
    },
});

// selectors
export const selectCars = (state, page) =>  {
    if(state.allCarsStore.value.hasOwnProperty(page)){
        return state.allCarsStore.value[page];
    }
    return null;
};

export const selectPaginationData = (state) =>  {
    return state.allCarsStore.value.paginationData;
};

export const selectCurrentPage = (state) => {
    return state.allCarsStore.value.currentPage;
}



export const { saveCars, setCurrentPage, savePaginationData, deleteCar, editCar } = carSlicer.actions;
export default carSlicer.reducer;