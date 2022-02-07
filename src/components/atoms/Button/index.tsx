import React from 'react';
import styles from './Button.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';

export function Button(props: PropsWithChildren<ButtonProps>): ReactElement {
  const {
    buttonStyle,
    title,
    buttonContainerStyle,
    onPress,
    isOutlined,
    titleStyle,
  } = props;

  return (
    <>
      <View style={buttonContainerStyle}>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            isOutlined
              ? [styles.btnOutline, {borderColor: Colors.Primary}]
              : atomicStyles.bgPrimary,
            buttonStyle,
          ]}
          onPress={onPress}>
          <Text
            style={[
              isOutlined ? atomicStyles.textPrimary : atomicStyles.textWhite,
              titleStyle,
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export interface ButtonProps {
  //
  buttonStyle?: ViewStyle | ViewStyle[];

  title?: string;

  titleStyle?: TextStyle | TextStyle[];

  buttonContainerStyle?: ViewStyle | ViewStyle[];

  onPress?: () => void;

  isOutlined?: boolean;
}

Button.defaultProps = {
  //
  isOutlined: true,
};

Button.displayName = nameof(Button);

export default Button;
