import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import authReducer from "../Reducers/authSlice";


const store = configureStore({
    reducer:{
        authenticate:authReducer
    }

})

export default store;
