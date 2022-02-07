import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Line.scss';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {View, Text} from 'react-native';
import {atomicStyles} from 'src/styles';
import {SCREEN_WIDTH} from 'src/config/const';

/**
 * File: Line.tsx
 * @created 2021-08-03 15:15:27
 * @author tientv <tientv20@fpt.com.vn>
 * @type {FC<PropsWithChildren<LineProps>>}
 */
const Line: FC<PropsWithChildren<LineProps>> = (
  props: PropsWithChildren<LineProps>,
): ReactElement => {
  const {
    title,
    value,
    icon,
    style,
    right,
    titleStyle,
    valueStyle,
    children,
    isChildren,
    numberOfLinesValue,
    titleBold,
  } = props;

  return (
    <View
      style={[atomicStyles.flexRow, atomicStyles.justifyContentBetween, style]}>
      <View style={[atomicStyles.flexRow]}>
        {icon}
        {!isChildren ? (
          <Text
            numberOfLines={1}
            style={[
              titleBold ? styles.titleBold : styles.title,
              atomicStyles.text,
              icon && atomicStyles.ml4,
              titleStyle,
              {
                minWidth: SCREEN_WIDTH * 0.4,
              },
            ]}>
            {title}
          </Text>
        ) : (
          children
        )}
      </View>
      {right ? (
        right
      ) : (
        <View style={[atomicStyles.flex1]}>
          <Text
            numberOfLines={numberOfLinesValue}
            style={[styles.value, valueStyle ? valueStyle : atomicStyles.bold]}>
            {value}
          </Text>
        </View>
      )}
    </View>
  );
};

export interface LineProps {
  title?: string;

  value?: string;

  icon?: ReactElement;

  right?: ReactElement;

  style?: StyleProp<ViewStyle>;

  titleStyle?: StyleProp<TextStyle>;

  valueStyle?: StyleProp<TextStyle>;

  isChildren?: boolean;

  numberOfLinesValue?: number;

  titleBold?: boolean;
}

Line.defaultProps = {
  isChildren: false,
  numberOfLinesValue: 1,
  titleBold: false,
};

Line.propTypes = {
  //
};

Line.displayName = nameof(Line);

export default Line;
