import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const userSlicer = createSlice({
    name: "users",
    initialState: initialState,
    reducers : {
        setSelectedUser(state, action){
            state.value.selectedUser = action.payload.userData;
        },
        
        setDefaultUsers(state, action){
            state.value.users = [];
        },

        saveUsers(state, action){
            state.value.users = action.payload.users
        },

        setPaginationData(state, action){
            state.value.paginationData = action.payload.paginationData;
        },

        setCurrentPage(state, action){
            state.value.currentPage = action.payload.page;
        },

        setEditUser(state, action){
            console.log(action.payload.userData);
            state.value.users = state.value.users.map(user => {
                if(user.id === action.payload.userData.id){
                    return action.payload.userData;
                }
                return user;
            });
        }
    },
});

// selectors
export const selectSelectedUser = (state) => {
    return state.userStore.value.selectedUser;
}

export const selectUsers = (state) => {
    return state.userStore.value.users;
}

export const selectCurrentPage = (state) => {
    return state.userStore.value.currentPage;
} 

export const selectPaginationData = (state) => {
    return state.userStore.value.paginationData
}

export const { setSelectedUser, saveUsers, setCurrentPage, setPaginationData, setEditUser } = userSlicer.actions;
export default userSlicer.reducer;