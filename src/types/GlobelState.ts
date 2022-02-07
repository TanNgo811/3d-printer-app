import type {AppLanguage} from './AppLanguage';

export interface GlobalState {
  appSettings: {
    baseUrl: string;

    language: AppLanguage;
  };
}
