import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authSlice";
import emailReducer from "../Reducers/emailSlice"
import sellerprofileReducer from "../Reducers/sellerprofileSlice"


const store = configureStore({
    reducer:{
        authenticate:authReducer,
        verifiedemail:emailReducer,
        sellerProfileDetail:sellerprofileReducer
    }

})

export default store;
