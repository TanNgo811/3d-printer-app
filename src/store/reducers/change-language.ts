import localization from 'react3l-localization';
import type {AppLanguage} from 'src/types/AppLanguage';
import type {GlobalAction} from 'src/store/GlobalAction';
import {asyncStorageRepository} from 'src/repositories/async-storage-repository';
import type {GlobalState} from '../GlobalState';

export function changeLanguage(
  state: GlobalState['global'],
  action: GlobalAction<AppLanguage>,
) {
  const language = action.payload;
  state.language = language;
  /**
   * Language state's side effect
   */
  localization.changeLanguage(language);
  asyncStorageRepository.saveLanguage(language);
}
