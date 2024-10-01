import { createSlice } from "@reduxjs/toolkit";

const initialState = {value : {}};

const userSlicer = createSlice({
    name: "users",
    initialState: initialState,
    reducers : {
        setSelectedUser(state, action){
            state.value.selectedUser = action.payload.userData;
        }
    },
});

// selectors
export const selectSelectedUser = (state) => {
    return state.userStore.value.selectedUser;
}



export const { setSelectedUser} = userSlicer.actions;
export default userSlicer.reducer;