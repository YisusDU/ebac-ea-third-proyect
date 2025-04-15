import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from "../state/products.slice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'user'] // State to persist
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

const store = configureStore({
    reducer: {
        cart: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false //Necessary for Redux Persist
        })
});

export const persistor = persistStore(store);
export default store;
