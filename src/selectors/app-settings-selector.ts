import type {GlobalState} from 'src/types/GlobelState';

export const baseUrlSelector = (state: GlobalState) =>
  state.appSettings.baseUrl;
