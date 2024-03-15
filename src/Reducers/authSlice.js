import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authenticate",
    initialState:{
        value:null
    },
    reducers:{
        setauthenticate(state, action) {
            state.value = action.payload
        }
    }
})


export const {setauthenticate} = authSlice.actions;
export default authSlice.reducer;