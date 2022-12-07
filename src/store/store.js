import { configureStore } from "@reduxjs/toolkit";
import auth from "./slice/auth";
import lang from "./slice/lang";
import result from "./slice/result";

import { setupListeners } from "@reduxjs/toolkit/query"

import { apiSlice } from './api/apiSlice'



export const store = configureStore({
    reducer: {
        lang,
        auth,
        result,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)
