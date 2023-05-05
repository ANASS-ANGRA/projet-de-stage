
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_base from "../../api";
import axios from "axios";

export const fetch_povs =createAsyncThunk("povs" , async ()=>{
    const response =await axios.get(`${Api_base}povs`)
    return response.data
})
export const fetch_pov_detail=createAsyncThunk("pov_detail",async(id)=>{
    const response = await axios.get(`${Api_base}detail_pov/${id}`)
    return response.data
})

const initialState={
    loading:false,
    povs:[],
    pov:[],
    edit:null ,
    sceance_edit:null
}

export const povs_slice=createSlice({
        name:"povs",
        initialState,
        reducers:{
            edit:(state,action)=>{
                console.log("ss")
                state.edit=state.povs.find((p)=>p.id==action.payload)
            },
            edit_sceance_sl:(state,action) =>{
                state.sceance_edit=state.pov.science.find((s)=>s.id==action.payload)
            }


        },
        extraReducers:(builder)=>{
            builder.addCase(fetch_povs.pending,(state , action)=>{
                     state.loading=true
            })
            builder.addCase(fetch_povs.fulfilled,(state , action)=>{
                state.loading=false;
                state.povs=action.payload
            })
            builder.addCase(fetch_pov_detail.pending,(state,action)=>{
                state.loading=true
            });
            builder.addCase(fetch_pov_detail.fulfilled ,(state,action)=>{
                state.loading=false;
                state.pov=action.payload
            })
        }   
    })

export const {edit ,edit_sceance_sl}=povs_slice.actions
export default povs_slice.reducer    