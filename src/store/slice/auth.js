import  axios  from "../../api/axois";
import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const registrationPath="/auth/registration"
const loginPath="/auth/login"


export const signup = createAsyncThunk('auth/signup', async (data,thunkAPI) => {

    try{
        const response = await axios.post(registrationPath,data)
        return response.data
    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.errors[0]?.msg)
    }

})

export const login = createAsyncThunk('auth/login', async (data,thunkAPI) => {

    try{
        const response = await axios.post(loginPath,data)
        return response.data
    }
    catch(err){
        console.log(err)
        const message=err.response?.data?.msg || err.response?.data?.errors[0]?.msg
        return thunkAPI.rejectWithValue(message)
    }

})




const initialState ={
    userInfo:{
        username:"",
        token:"",
    },
    status: 'idle',
    isError:false,
    isSuccess:false,
    errorMsg:"",
}


const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false
            state.isError = false
            state.errorMsg=""
          }
    },

    extraReducers(builder){
        builder
        .addCase(signup.pending, (state, action) => {
            state.status = 'loading'
        })

        .addCase(signup.fulfilled, (state, action) => {
            state.isSuccess = true
        })


        .addCase(signup.rejected, (state, action) => {
            state.isError = true
            state.errorMsg = action.payload
        })


        ////Login

        .addCase(login.pending, (state, action) => {
            state.isError = true
            state.errorMsg = action.payload
        })

        
        .addCase(login.fulfilled, (state, action) => {

            const{username,token}=action.payload
            console.log(action.payload)
            state.userInfo.username=username
            state.userInfo.token=token
            state.isSuccess=true

        })

        .addCase(login.rejected, (state, action) => {
            state.isError = true
            state.errorMsg = action.payload
        })

    }

})


export const selectCurrentUser = (state) => state.auth.userInfo.username

export const { reset } = auth.actions

export default auth.reducer