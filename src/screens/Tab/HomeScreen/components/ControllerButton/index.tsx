import React from 'react';
import styles from './ControllerButton.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {TouchableOpacity, ViewStyle} from 'react-native';

export function ControllerButton(
  props: PropsWithChildren<ControllerButtonProps>,
): ReactElement {
  const {onPress, style, children} = props;

  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.controllerBtn, style]}>
        {children}
      </TouchableOpacity>
    </>
  );
}

export interface ControllerButtonProps {
  //
  onPress?: () => void;

  style?: ViewStyle | ViewStyle[];
}

ControllerButton.defaultProps = {
  //
};

ControllerButton.displayName = nameof(ControllerButton);

export default ControllerButton;
