import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ProcessingScreen.scss';
import {View, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'src/config/const';
import {useTemperatureChartService} from 'src/services/temperature-chart/use-temperature-chart-service';
import {atomicStyles} from 'src/styles';

/**
 * File: ProcessingScreen.tsx
 * @created 2022-01-06 00:24:14
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ProcessingScreenProps>>}
 */

const ProcessingScreen: FC<PropsWithChildren<ProcessingScreenProps>> = (
  props: PropsWithChildren<ProcessingScreenProps>,
): ReactElement => {
  const {} = props;

  const [translate] = useTranslation();

  const [tempArray] = useTemperatureChartService();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Theo dõi')}
        isLeftIcon={false}
        contentScrollable={true}>
        <View style={styles.container}>
          <View style={styles.chartContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  atomicStyles.textPrimary,
                  atomicStyles.bold,
                  atomicStyles.textCenter,
                ]}>
                {translate('Temperature Tracking')}
              </Text>
            </View>

            <VictoryChart
              width={SCREEN_WIDTH}
              theme={VictoryTheme.material}
              height={SCREEN_HEIGHT * 0.35}>
              <VictoryAxis dependentAxis={true} />

              <VictoryArea
                interpolation={'natural'}
                data={tempArray}
                y={'temp'}
                x={'time'}
                domain={
                  tempArray?.length > 1
                    ? {
                        x: [
                          tempArray[tempArray?.length - 1]?.time - 5000,
                          tempArray[tempArray?.length - 1]?.time,
                        ],
                        y: [
                          tempArray[tempArray?.length - 1]?.temp - 10,
                          tempArray[tempArray?.length - 1]?.temp + 10,
                        ],
                      }
                    : undefined
                }
                style={{data: {fill: '#0d6efd', fillOpacity: 0.5}}}
              />
            </VictoryChart>
          </View>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface ProcessingScreenProps extends StackScreenProps<any> {
  //
}

ProcessingScreen.defaultProps = {
  //
};

ProcessingScreen.propTypes = {
  //
};

ProcessingScreen.displayName = nameof(ProcessingScreen);

export default ProcessingScreen;
