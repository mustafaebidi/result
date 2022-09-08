import { createSlice } from "@reduxjs/toolkit";

import { en } from '../../resources/en';
import { ar } from '../../resources/ar';


const localSorageLang = localStorage.getItem('language');


const initialState ={

    currentLocale: localSorageLang ?  localSorageLang :"en",
    currentResource: localSorageLang ?  localSorageLang === "en" ? en :ar : en,
    
}


const lang = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLang(state,action){

            ///localStorage.setItem("language", `${action.payload}`);

            state.currentLocale=action.payload
            state.currentResource= action.payload === "en" ? en  : ar

        }
    },

})

export const selectCurrentResource = (state)=>state.lang.currentResource

export const { changeLang } = lang.actions

export default lang.reducer