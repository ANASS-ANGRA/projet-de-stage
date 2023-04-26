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

const initialState = {
  type: [],
  loading: false,
  appliances:[],
};

export const Appliance_slice = createSlice({
  name: "appliance",
  initialState,
  reducers: {},
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
    }
});

export default Appliance_slice.reducer;
