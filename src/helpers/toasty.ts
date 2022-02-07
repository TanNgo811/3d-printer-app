import type {Options} from 'react-native-toasty';
import {RNToasty} from 'react-native-toasty';

const defaultOptions: Partial<Options> = {
  duration: 1,
  position: 'bottom',
};

export function showError(title: string, options?: Partial<Options>) {
  RNToasty.Error({
    title,
    ...defaultOptions,
    ...options,
  });
}

export function showInfo(title: string, options?: Partial<Options>) {
  RNToasty.Info({
    title,
    ...defaultOptions,
    ...options,
  });
}

export function showWarning(title: string, options?: Partial<Options>) {
  RNToasty.Warn({
    title,
    ...defaultOptions,
    ...options,
  });
}

export function showSuccess(title: string, options?: Partial<Options>) {
  RNToasty.Success({
    title,
    ...defaultOptions,
    ...options,
  });
}
