import { configureStore } from "@reduxjs/toolkit";
import auth from "./slice/auth";
import lang from "./slice/lang";



export const store = configureStore({
    reducer: {
        lang,
        auth,

       
    }
})