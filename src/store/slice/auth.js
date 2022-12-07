import {
    createSlice,
    createSelector,
    
} from "@reduxjs/toolkit";




const initialState ={
    userInfo:{
        username:"",
        token:"",
    },

}


const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setCredentials: (state, action) => {
            state.userInfo = {...action.payload}
        },
        logOut: (state, action) => {
            state.userInfo = null
        },
    },



})


export const selectCurrentUser = (state) => state.auth.userInfo.username

export const { setCredentials,logOut } = auth.actions

export default auth.reducer