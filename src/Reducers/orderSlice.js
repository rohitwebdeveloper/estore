import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'orderdetails',
    initialState:[],
    reducers:{
        setorderdetails(state, action){
            state.push(action.payload)
        },
        removeorderdetails(state, action){
            state.splice(action.payload, 1)
        }
    }, 
    
    
})

export const {setorderdetails, removeorderdetails} = orderSlice.actions;
export default orderSlice.reducer;