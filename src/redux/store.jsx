import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";
import cartReducer from "./Reducer/cartReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
    },
   
})


export default store;
