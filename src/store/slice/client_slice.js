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
export const fetch_client = createAsyncThunk("client_contact",async (id)=>{
   const response = await axios.get(`${Api_base}client_contact/${id}`)
   return response.data
})

  const initialState = {
    loading: false,
    clients:[],
    client:[],
    edit:null,
    contact_edit:null
  };
  
  export const Clients_slice = createSlice({
    name: "cliens",
    initialState,
    reducers: {
      edit:(state, action)=>{
        state.edit=state.clients.find((c)=>c.id==action.payload)
      },
      contact_edit_f:(state ,action)=>{
        console.log(action.payload)
        state.contact_edit=state.client?.contact.find((c)=>c.id == action.payload)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetch_clients.pending, (state, action) => {
            state.loading=true;
        });
        builder.addCase(fetch_clients.fulfilled, (state, action) => {
            state.loading=false
            state.clients=action.payload
       });
       builder.addCase(fetch_client.pending,(state,action)=>{
        state.loading=true;
       })
       builder.addCase(fetch_client.fulfilled ,(state,action)=>{
            state.loading=false;
            state.client=action.payload
       })
       }
    
  })
  export const {edit ,contact_edit_f} =Clients_slice.actions
  export default Clients_slice.reducer