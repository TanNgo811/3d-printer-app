import {configureStore, createSlice} from '@reduxjs/toolkit';

const middlewares = [];

if (__DEV__) {
  const rnFlipper = require('rn-redux-middleware-flipper').default;
  const reduxFlipper = require('redux-flipper').default;
  middlewares.push(rnFlipper(), reduxFlipper());
}

export interface GlobalState {}

const initialState: GlobalState = {};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export const store = configureStore({
  reducer: globalSlice.reducer,
  middleware: middlewares,
});
