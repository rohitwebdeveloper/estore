import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name:'verifiedemail',
    initialState:{
        value:null
    },
    reducers:{
        setverifiedemail(state, action){
            state.value=action.payload
        }
    }
})

export const {setverifiedemail} = emailSlice.actions;
export default emailSlice.reducer;