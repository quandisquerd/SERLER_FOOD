// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import apiProduct from '../api/product';


export const store = configureStore({
    reducer: {
        [apiProduct.reducerPath]: apiProduct.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiProduct.middleware),
});

setupListeners(store.dispatch);
