import React from 'react';
import styles from './TemperatureControl.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {Text, TextInput, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import ExpandableSlider from 'react-native-expandable-slider';

export function TemperatureControl(
  props: PropsWithChildren<TemperatureControlProps>,
): ReactElement {
  const {title, onChange} = props;

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
          {'rpm'}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.slider}>
          <ExpandableSlider
            min={800}
            max={20000}
            value={800}
            onSlide={onChange}
            heightRef={{current: 29}}
            style={[styles.temperatureSlider, atomicStyles.bgPrimary]}
            useHapticResponse={false}
          />
        </View>

        <TextInput
          style={[styles.textInput, atomicStyles.textDark]}
          defaultValue={'100'}
        />
      </View>
    </View>
  );
}

export interface TemperatureControlProps {
  //

  title?: string;

  onChange?: (value: number, percentage: number) => any;
}

TemperatureControl.defaultProps = {
  //
};

TemperatureControl.displayName = nameof(TemperatureControl);

export default TemperatureControl;
