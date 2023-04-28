
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_base from "../../api";
import axios from "axios";

export const fetch_povs =createAsyncThunk("povs" , async ()=>{
    const response =await axios.get(`${Api_base}povs`)
    return response.data
})

const initialState={
    loading:false,
    povs:[]
}

export const povs_slice=createSlice({
        name:"povs",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(fetch_povs.pending,(state , action)=>{
                    //  state.loading=true
            })
            builder.addCase(fetch_povs.fulfilled,(state , action)=>{
                console.log(action.payload)
                state.loading=false;
                state.povs=action.payload
            })
        }   
    })


export default povs_slice.reducer    