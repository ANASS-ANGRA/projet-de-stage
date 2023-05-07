import { configureStore } from '@reduxjs/toolkit';
import Appliance_slice from './slice/appliance_slice';
import { combineReducers } from 'redux';
import Clients_slice from './slice/client_slice';
import  povs_slice  from './slice/pov_slice';
import  utilisateur  from './slice/user_slice';


const rootReducer = combineReducers({
  appliance:Appliance_slice,
  clients:Clients_slice,
  povs:povs_slice,
  utilisateur:utilisateur
});

export const Store=configureStore({
    reducer:rootReducer,
})
