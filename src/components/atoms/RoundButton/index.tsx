import React from 'react';
import styles from './RoundButton.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from 'react-native';
import {SvgIcon} from 'react3l-native-kit';
import {atomicStyles} from 'src/styles';
import type {SvgComponent} from 'react-native-svg-types';

export function RoundButton(
  props: PropsWithChildren<RoundButtonProps>,
): ReactElement {
  const {title, icon, ...restProps} = props;

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          {...restProps}
          style={[atomicStyles.bgPrimary, styles.roundButton]}>
          <SvgIcon component={icon} />
        </TouchableOpacity>
        <Text
          style={[
            atomicStyles.text,
            atomicStyles.textCenter,
            atomicStyles.textSecondary,
            atomicStyles.mt2,
            styles.textButton,
          ]}>
          {title}
        </Text>
      </View>
    </>
  );
}

export interface RoundButtonProps extends TouchableOpacityProps {
  //
  icon: {
    default: SvgComponent;
  };

  title: string;
}

RoundButton.defaultProps = {
  //
};

RoundButton.displayName = nameof(RoundButton);

export default RoundButton;
