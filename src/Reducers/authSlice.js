import { createSlice } from "@reduxjs/toolkit/dist/createSlice";

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


export const {setauthenticate} = authSlice.reducer;
export default authSlice.reducer;