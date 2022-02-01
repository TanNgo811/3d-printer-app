import EyeSlashIcon from 'assets/icons/24/eye-slash.svg';
import EyeIcon from 'assets/icons/24/eye.svg';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React, {useState} from 'react';
import type {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useBoolean} from 'react3l-common';
import {atomicStyles, Colors} from 'src/styles';
import nameof from 'ts-nameof.macro';
import styles from './Input.scss';
import {ANDROID, IOS} from 'src/config/const';

/**
 * File: Input.tsx
 * @created 2021-07-29 17:31:57
 * @author tientv <tientv20@fpt.com.vn>
 * @type {FC<PropsWithChildren<InputProps>>}
 */
const Input: FC<PropsWithChildren<InputProps>> = (
  props: PropsWithChildren<InputProps>,
): ReactElement => {
  const {
    iconLeft,
    iconRight,
    placeholder,
    containerStyle,
    inputStyle,
    value,
    defaultValue,
    onChange,
    onFocusInput,
    onPressR,
    passWordType,
    inputProps,
    title,
    editable,
    titleStyle,
    errorMessage,
    placeholderTextColor,
    parentContainerStyle,
    keyboardType,
    ...restProps
  } = props;

  const [focus, setFocus] = useState(false);

  const [ref, setRef] = React.useState<any>();

  const [secureText, setSecureText] = useBoolean(passWordType!);

  const handlePressIconEye = React.useCallback(() => {
    setSecureText();
  }, [setSecureText]);

  return (
    <View style={[parentContainerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => ref.focus()}
        style={[
          atomicStyles.mt16px,
          atomicStyles.flexRow,
          atomicStyles.alignItemsCenter,
          atomicStyles.bgWhite,
          styles.inputView,
          atomicStyles.px16px,
          containerStyle,
          focus && !errorMessage && styles.borderFocus,
          errorMessage && [styles.borderError, {borderColor: Colors.BabyRed}],
        ]}>
        <View style={styles.leftContainer}>
          {iconLeft && <View style={[styles.iconL]}>{iconLeft}</View>}
          {title && (
            <Text style={[atomicStyles.text, styles.title, titleStyle]}>
              {title}
            </Text>
          )}
        </View>

        <View
          style={[
            !title
              ? styles.valueNoTitle
              : ANDROID
              ? styles.rightContainerAndroid
              : styles.valueWithTitle,
            styles.rightContainer,
          ]}>
          <TextInput
            ref={ref => setRef(ref)}
            placeholderTextColor={placeholderTextColor}
            defaultValue={defaultValue}
            onChangeText={onChange}
            onFocus={() => {
              setFocus(true);
              onFocusInput ? onFocusInput() : '';
            }}
            editable={editable}
            onBlur={() => setFocus(false)}
            placeholder={placeholder}
            secureTextEntry={secureText}
            keyboardType={keyboardType}
            value={value}
            style={[
              styles.inputStyle,
              IOS && atomicStyles.pb2,
              iconLeft ? styles.inputHaveLicon : '',
              iconRight ? styles.inputHaveRicon : '',
              ANDROID && styles.inputAndroid,
              ANDROID && title && styles.inputAndroidRight,
              inputStyle,
            ]}
            {...restProps}
            {...inputProps}
          />

          {iconRight && (
            <TouchableOpacity onPress={onPressR} style={[styles.iconR]}>
              {iconRight}
            </TouchableOpacity>
          )}
          {passWordType && (
            <TouchableOpacity
              onPress={handlePressIconEye}
              style={[styles.iconR]}>
              {!secureText ? <EyeIcon /> : <EyeSlashIcon />}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {errorMessage && (
        <Text
          style={[
            atomicStyles.textDanger,
            styles.valueHaveErrorMessage,
            atomicStyles.pt2,
          ]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export interface InputProps {
  iconLeft?: ReactElement;

  iconRight?: ReactElement;

  placeholder?: string;

  containerStyle?: StyleProp<ViewStyle>;

  value?: string;

  defaultValue?: string;

  inputStyle?: StyleProp<TextStyle>;

  titleStyle?: StyleProp<TextStyle>;

  onChange?: (text: string) => void;

  inputProps?: TextInputProps;

  onFocusInput?: () => void;

  passWordType?: boolean;

  title?: string;

  onPressR?: () => void;

  editable?: boolean;

  testID?: string;

  errorMessage?: string;

  placeholderTextColor?: string;

  parentContainerStyle?: StyleProp<ViewStyle>;

  keyboardType?: KeyboardTypeOptions;
}

Input.defaultProps = {
  passWordType: false,

  editable: true,

  placeholderTextColor: Colors.Gray,
};

Input.propTypes = {
  //
};

Input.displayName = nameof(Input);

export default Input;
