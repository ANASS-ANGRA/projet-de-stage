import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_base from "../../api";
import axios from "axios";

export const fetch_type_appliance = createAsyncThunk("type", async () => {
  const response = await axios.get(`${Api_base}type_appliance`);
  return response.data;
});

export const fetch_appliances =createAsyncThunk("appliance" , async ()=>{
    const response =await axios.get(`${Api_base}appliances`);
    return response.data;
})

export const fetch_appliances_detail=createAsyncThunk("detail_appliance", async(id)=>{
       const response= await axios.get(`${Api_base}applience/${id}`)
       return response.data
})

export const recherche=createAsyncThunk("recherch",async(d)=>{
       const response =await axios.get(`${Api_base}recherche_appliance/${d.appliance}/${d.client}`)
       return response.data
})
const initialState = {
  type: [],
  loading: false,
  appliances:[],
  detail:[],
  rech:{},
  edit:null
};

export const Appliance_slice = createSlice({
  name: "appliance",
  initialState,
  reducers: {
    edit:(state,action)=>{
      console.log(action.payload)
         state.edit = state.appliances.find((e)=> e.id == action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetch_type_appliance.pending, (state, action) => {
    });
    builder.addCase(fetch_type_appliance.fulfilled, (state, action) => {
      state.type = action.payload;
    });
    builder.addCase(fetch_appliances.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetch_appliances.fulfilled, (state, action) => {
        state.appliances = action.payload;
        state.loading = false;
      });
    builder.addCase(fetch_appliances_detail.pending ,(state , action)=>{
      state.loading=true;
      
    });
    builder.addCase(fetch_appliances_detail.fulfilled,(state,action)=>{
      state.loading=false;
      state.detail=action.payload
    });
    builder.addCase(recherche.pending,(state,action)=>{
      state.loading=true;
    });
    builder.addCase(recherche.fulfilled,(state,action)=>{
      state.loading=false;
      state.rech=action.payload[0]
    })
    }
});


export default Appliance_slice.reducer;
export const { edit } = Appliance_slice.actions