import {AppLanguage} from 'src/types/AppLanguage';
import type {GlobalState} from 'src/types/GlobelState';

export const initialState: GlobalState = {
  appSettings: {
    language: AppLanguage.VIETNAMESE,
    baseUrl: '192.168.0.1',
  },
};
