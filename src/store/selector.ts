import type {GlobalState} from 'src/store/index';

export function languageSelector(state: GlobalState) {
  return state.global.language;
}
