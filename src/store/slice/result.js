import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "axios";



export const resultBySeatNumber = createAsyncThunk('result/seatNumber', async (data,thunkAPI) => {

    try{
        const response = await axios.post(registrationPath,data)
        return response.data
    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.errors[0]?.msg)
    }

})



const initialState ={

    status: 'idle',
    isError:false,
    isSuccess:false,
    errorMsg:"",
    data:""
}


const result = createSlice({
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

export default result.reducer