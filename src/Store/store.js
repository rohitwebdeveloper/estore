import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authSlice";
import emailReducer from "../Reducers/emailSlice"


const store = configureStore({
    reducer:{
        authenticate:authReducer,
        verifiedemail:emailReducer
    }

})

export default store;
