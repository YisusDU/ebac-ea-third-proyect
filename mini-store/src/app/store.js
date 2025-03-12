import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../state/products.slice"

// It is not necessary to use combineReducer, as the toolkit does it by default


const store = configureStore({
    reducer: {
        cart: productsReducer
    }
});

export default store;
