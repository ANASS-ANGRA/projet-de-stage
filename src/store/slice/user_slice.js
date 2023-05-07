import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_base from "../../api";
import axios from "axios";
import { Action } from "@remix-run/router";


const initialState={
    tokens:null,
    utilisateur:null 
}


export const utilisateur = createSlice({
    name:"user",
    initialState,
    reducers:{
         connection:(state,action)=>{
            state.tokens=action.payload
         },
         utilisateur_c:(state,action)=>{
            state.utilisateur=action.payload
         }
    }
})

export const {connection , utilisateur_c}=utilisateur.actions
export default utilisateur.reducer   