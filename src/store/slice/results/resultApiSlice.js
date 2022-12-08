
import {  createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../api/apiSlice"

import { saveResults } from "../result"





export const resultApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getResultByName: builder.query({
            query: ({page,name}) => ({
                url:`results/getByName?name=${name}&page=${page}`,
                method: 'GET',
            }),



            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    //dispatch(setloding(true))
                    const {data} = await queryFulfilled 
                    dispatch(saveResults( data ))
                    //dispatch(setloding(false))

                } catch (err) {
                    return 
                }
            }


    
        }),

        getResultsBySittingNumber: builder.query({
            query: (number) => ({
                url:`results/getBySittingNumber/${number}`,
                method: 'GET',
            }),

        }),

        getBySchool: builder.query({
            query: ({page,name}) => ({
                url:`results/getBySchool?name=${name}&page=${page}`,
                method: 'GET',
            }),


        }),

        getByAdministration: builder.query({
            query: ({name,page}) => ({
                url:`results/getByAdministration?name=${name}&page=${page}`,
                method: 'GET',
            }),

        }),

    })
})

export const selectNotesResult = resultApiSlice.endpoints.getResultByName.select()


export const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => {
        return notesResult.data
    } // normalized state object with ids & entities
)


export const {

    useGetResultsBySittingNumberQuery,
    useLazyGetResultsBySittingNumberQuery,


} = resultApiSlice 

