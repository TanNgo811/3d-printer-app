import type {GlobalState} from 'src/store/GlobalState';

export function languageSelector(state: GlobalState) {
  return state.global.language;
}
