import { configureStore } from '@reduxjs/toolkit';
import Appliance_slice from './slice/appliance_slice';
import { combineReducers } from 'redux';
import Clients_slice from './slice/client_slice';
import  povs_slice  from './slice/pov_slice';


const rootReducer = combineReducers({
  appliance:Appliance_slice,
  clients:Clients_slice,
  povs:povs_slice

});

export const Store=configureStore({
    reducer:rootReducer,
})
