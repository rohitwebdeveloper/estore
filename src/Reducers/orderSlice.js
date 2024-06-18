import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'orderdetails',
    initialState:[],
    reducers:{
        setorderdetails(state, action){
            state.push(action.payload)
        }
    }
})

export const {setorderdetails} = orderSlice.actions;
export default orderSlice.reducer;