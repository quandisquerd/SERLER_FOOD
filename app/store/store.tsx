// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import apiProduct from '../api/product';
import apiCategory from '../api/category';
import apiTopping from '../api/topping';
import apiAuth from '../api/auth';


export const store = configureStore({
    reducer: {
        [apiProduct.reducerPath]: apiProduct.reducer,
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiTopping.reducerPath]: apiTopping.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiProduct.middleware, apiCategory.middleware, apiTopping.middleware, apiAuth.middleware),

});

setupListeners(store.dispatch);
