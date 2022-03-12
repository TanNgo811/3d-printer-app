import {configureStore, createSlice} from '@reduxjs/toolkit';
import {AppLanguage} from 'src/types/AppLanguage';
import {PRINTER_URL} from 'src/config/const';

const middlewares = [];

if (__DEV__) {
  const rnFlipper = require('rn-redux-middleware-flipper').default;
  const reduxFlipper = require('redux-flipper').default;
  middlewares.push(rnFlipper(), reduxFlipper());
}

type GlobalAction<T> = {
  type: string;
  payload: T;
};

export interface GlobalState {
  global: {
    language: AppLanguage;

    baseUrl: string;
  };
}

const initialState: GlobalState['global'] = {
  language: AppLanguage.VIETNAMESE,

  baseUrl: PRINTER_URL,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeLanguage: (
      state: GlobalState['global'],
      action: GlobalAction<AppLanguage>,
    ) => {
      state.language = action.payload;
    },

    changeServerUrl: (
      state: GlobalState['global'],
      action: {
        type: string;
        payload: string;
      },
    ) => {
      state.baseUrl = action.payload;
    },

    loadAppSettings(
      state: GlobalState['global'],
      action: {
        type: string;
        payload: GlobalState['global'];
      },
    ) {
      const {language, baseUrl} = action.payload;
      if (language) {
        state.language = language;
      }

      if (baseUrl) {
        state.baseUrl = baseUrl;
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
  middleware: middlewares,
});
