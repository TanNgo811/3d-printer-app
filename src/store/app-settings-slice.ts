import {createSlice} from '@reduxjs/toolkit';
import nameof from 'ts-nameof.macro';
import {initialState} from 'src/store/initial-state';
import type {GlobalState} from 'src/types/GlobelState';

export const appSettingsSlice = createSlice({
  name: nameof(initialState.appSettings),
  initialState: initialState.appSettings,
  reducers: {
    changeServerUrl: (
      state: GlobalState['appSettings'],
      action: {
        type: string;
        payload: string;
      },
    ) => {
      state.baseUrl = action.payload;
    },

    loadAppSettings(
      state: GlobalState['appSettings'],
      action: {
        type: string;
        payload: GlobalState['appSettings'];
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
