import { configureStore } from '@reduxjs/toolkit';
import appliance_slice, { Appliance_slice } from './slice/appliance_slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appliance: appliance_slice,
});

export const Store=configureStore({
    reducer:rootReducer,
})
