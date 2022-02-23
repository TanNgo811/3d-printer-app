import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './TemperatureControl.scss';
import nameof from 'ts-nameof.macro';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import ExpandableSlider from 'react-native-expandable-slider';
import {SvgIcon} from 'react3l-native-kit';

export function TemperatureControl(
  props: PropsWithChildren<TemperatureControlProps>,
): ReactElement {
  const {title, subTitle, onConfirm, maxValue, currentValue} = props;

  const [targetValue, setTargetValue] = React.useState<number>(0);

  const handleChangeSlider = React.useCallback(
    (value: number, _percentage: number) => {
      setTargetValue(value);
    },
    [],
  );

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (parseFloat(text) > maxValue!) {
        setTargetValue(maxValue!);
      } else if (parseFloat(text) < 0) {
        setTargetValue(0);
      } else {
        setTargetValue(parseFloat(text));
      }
    },
    [maxValue],
  );

  const handleConfirmValue = React.useCallback(() => {
    onConfirm && onConfirm(targetValue);
  }, [onConfirm, targetValue]);

  return (
    <View style={[styles.container, atomicStyles.bgWhite]}>
      <View style={[styles.header]}>
        <Text
          style={[
            atomicStyles.textPrimary,
            atomicStyles.bold,
            ANDROID && atomicStyles.androidBold,
          ]}>
          {title}
        </Text>

        <Text
          style={[
            atomicStyles.textPrimary,
            atomicStyles.bold,
            ANDROID && atomicStyles.androidBold,
          ]}>
          {subTitle}
        </Text>

        <Text
          style={[
            atomicStyles.textPrimary,
            atomicStyles.bold,
            ANDROID && atomicStyles.androidBold,
          ]}>
          {currentValue}/{Math.round(targetValue)}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.slider}>
          <ExpandableSlider
            min={0}
            max={maxValue}
            value={targetValue}
            onSlide={handleChangeSlider}
            heightRef={{current: 29}}
            style={[styles.temperatureSlider, atomicStyles.bgPrimary]}
            useHapticResponse={false}
          />
        </View>

        <TextInput
          style={[styles.textInput, atomicStyles.textPrimary]}
          defaultValue={Math.round(targetValue).toString()}
          onChangeText={handleChangeText}
          keyboardType={'number-pad'}
        />

        <TouchableOpacity
          onPress={handleConfirmValue}
          style={[styles.confirmButton, atomicStyles.bgPrimary]}>
          <SvgIcon
            component={require('assets/icons/24/direct-right-full.svg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export interface TemperatureControlProps {
  //

  title?: string;

  subTitle?: string;

  onChangeSlide?: (value: number, percentage: number) => any;

  onChangeText?: (text: string) => void;

  maxValue?: number;

  currentValue?: number;

  onConfirm?: (value: number) => void;
}

TemperatureControl.defaultProps = {
  //
};

TemperatureControl.displayName = nameof(TemperatureControl);

export default TemperatureControl;
