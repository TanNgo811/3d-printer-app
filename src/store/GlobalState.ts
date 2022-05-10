import type {AppLanguage} from 'src/types/AppLanguage';

export interface GlobalState {
  global: {
    language: AppLanguage;

    baseUrl: string;
  };
}
