import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import cartReducer from './slice/shoppingCart';
export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    }
})