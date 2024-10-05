import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {
    "filter": {}
}};

const statisticsSlicer = createSlice({
    name: "statistics",
    initialState: initialState,
    reducers : {
        saveStats(state, action){
            state.value[action.payload.page] = action.payload.stats;
        },

        savePaginationData(state, action){
            state.value.paginationData = action.payload.paginationData;
        },

        setCurrentPage(state, action){
            state.value.currentPage = action.payload.page;
        },

        refreshStatFirstPage(state, action){
            state.value[1] = null; 
        },

        setDefault(state, action){
            state.value = initialState;
        },

        saveFilterStats(state, action){
            state.value.filter[action.payload.page] = action.payload.stats;
        },

        saveFilterPaginationData(state, action){
            state.value.filter.paginationData = action.payload.paginationData;
        },

        setFilterCurrentPage(state, action){
            state.value.filter.currentPage = action.payload.page;
        },
    },
});

// selectors
export const selectStats = (state, page) =>  {
    if(state.statisticsStore.value.hasOwnProperty(page)){
        return state.statisticsStore.value[page];
    }
    return null;
};

export const selectPaginationData = (state) =>  {
    return state.statisticsStore.value.paginationData;
};

export const selectCurrentPage = (state) => {
    return state.statisticsStore.value.currentPage;
}

export const selectShouldFetchNextPage = (state) =>{
    let nextPage = state.statisticsStore.value.currentPage + 1;
    if(!state.statisticsStore.value.hasOwnProperty(nextPage) || state.statisticsStore.value[nextPage]?.length === 9){
        return true;
    }
    return false;
}

export const selectFilterStats = (state, page) =>  {
    if(state.statisticsStore.value.filter.hasOwnProperty(page)){
        return state.statisticsStore.value.filter[page];
    }
    return null;
};

export const selectFilterPaginationData = (state) =>  {
    return state.statisticsStore.value.filter.paginationData;
};

export const selectFilterCurrentPage = (state) => {
    return state.statisticsStore.value.filter.currentPage;
}



export const { 
    saveStats, 
    setCurrentPage, 
    savePaginationData,
    saveFilterStats, 
    setFilterCurrentPage, 
    saveFilterPaginationData,  
    refreshStatFirstPage,
} = statisticsSlicer.actions;
export default statisticsSlicer.reducer;