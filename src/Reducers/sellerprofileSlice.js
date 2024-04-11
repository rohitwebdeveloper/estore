import { createSlice } from "@reduxjs/toolkit";

const sellerprofileSlice = createSlice({
    name:'sellerProfileDetail',
    initialState:[],
    reducers:{
        setsellerProfileDetail(state, action){
            state.splice(0, 1, action.payload)
             
        }
    } 
})

export const {setsellerProfileDetail} = sellerprofileSlice.actions;
export default sellerprofileSlice.reducer;