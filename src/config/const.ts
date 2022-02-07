import {Dimensions, KeyboardAvoidingViewProps, Platform} from 'react-native';
import ReactNativeConfig from 'react-native-config';

export const PRINTER_URL: string = 'http://192.168.31.63';

export const ANDROID: boolean = Platform.OS === 'android';

export const IOS: boolean = Platform.OS === 'ios';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export {SCREEN_WIDTH, SCREEN_HEIGHT};

export const KEYBOARD_AVOIDING_VIEW_BEHAVIOR: KeyboardAvoidingViewProps['behavior'] =
  IOS ? 'padding' : 'height';

export const HEIGHT_HEADER = 88;

export const END_REACHED_THRESHOLD = 0.5;

/**
 * Date time constants
 */

export const DATE_FORMAT = 'DD-MM-YYYY';

export const TIME_FORMAT = 'HH:mm:ss';

export const TIME_HOUR_FORMAT = 'HH:mm';

export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const TIME_DATE = 86400000;

export const storeCheckingBannerRatio = 263 / 347;

export const APP_ID: string = ANDROID
  ? ReactNativeConfig.HERE_MAP_ANDROID_ID
  : ReactNativeConfig.HERE_MAP_IOS_ID;

export const APP_CODE: string = IOS
  ? ReactNativeConfig.HERE_MAP_ANDROID_CODE
  : ReactNativeConfig.HERE_MAP_IOS_CODE;
