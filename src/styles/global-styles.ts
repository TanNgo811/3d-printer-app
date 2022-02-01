import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  bgLight: {
    backgroundColor: '@lightColor',
  },
  bgPrimary: {
    backgroundColor: '@primaryColor',
  },
  //--------------text-----------
  placeholderLight: {
    color: '@placeholderLight',
  },
  placeholderDark: {
    color: '@placeholderDark',
  },
  textLightColor: {
    color: '@lightColor',
  },
  textDarkColor: {
    color: '@darkColor',
  },
  textPrimaryColor: {
    color: '@primaryColor',
  },
  textErrorColor: {
    color: '@dangerColor',
  },
  textWarningColor: {
    color: '@warningColor',
  },
  textWarningSuccess: {
    color: '@successColor',
  },
  boxShadow: {
    color: '@secondaryColor',
  },
});
