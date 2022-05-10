import AsyncStorage from '@react-native-async-storage/async-storage';
import nameof from 'ts-nameof.macro';
import type {AppLanguage} from 'src/types/AppLanguage';

export class AsyncStorageRepository {
  /**
   * Persistent app language
   *
   * @enum {AppLanguage}
   */
  public language?: AppLanguage | null;

  public serverUrl?: string | null;

  public saveServerUrl = async (serverUrl: string) => {
    return AsyncStorage.setItem(nameof(this.serverUrl), serverUrl);
  };

  public getServerUrl = async (): Promise<string | null> => {
    return AsyncStorage.getItem(nameof(this.serverUrl));
  };

  public saveLanguage = async (language: string) => {
    return AsyncStorage.setItem(nameof(this.language), language);
  };

  public getLanguage = async (): Promise<string | null> => {
    return AsyncStorage.getItem(nameof(this.language));
  };

  public async initialize(): Promise<void> {
    this.serverUrl = await AsyncStorage.getItem(nameof(this.serverUrl));
  }
}

export const asyncStorageRepository: AsyncStorageRepository =
  new AsyncStorageRepository();
