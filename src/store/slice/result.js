import { createSelector, createSlice } from "@reduxjs/toolkit";



const initialState ={
    result:[],
    loading:false,

}


const result = createSlice({
    name: 'result',
    initialState,
    reducers: {
        saveResults(state,action){
            state.result=action.payload
        },
        setloding(state,action){
            console.log(action.payload)
            state.loading=action.payload
        }


        
    },

})

export const dada = (state)=>state.result.loading


export const selectCurrentResults = (state)=>state.result.result

export const selectUserById = createSelector(
    [selectCurrentResults,(state,id)=>id],
    (result,id) => result.data.find((result)=>result._id === id) 
)


export const { saveResults,setloding } = result.actions

export default result.reducer