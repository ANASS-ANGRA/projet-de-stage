import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_base from "../../api";
import axios from "axios";

/*export const new_client= createAsyncThunk("new client",(data)=>{
     axios.post(`${Api_base}new_client`,data).then(()=>{
      fetch_clients()
     })
})*/



export const fetch_clients = createAsyncThunk("clients", async () => {
    const response = await axios.get(`${Api_base}clients`);
    return response.data;
  });


  const initialState = {
    loading: false,
    clients:[]
  };
  
  export const Clients_slice = createSlice({
    name: "cliens",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetch_clients.pending, (state, action) => {
            state.loading=true;
        });
        builder.addCase(fetch_clients.fulfilled, (state, action) => {
            state.loading=false
            state.clients=action.payload
       });
    }
  })

  export default Clients_slice.reducer