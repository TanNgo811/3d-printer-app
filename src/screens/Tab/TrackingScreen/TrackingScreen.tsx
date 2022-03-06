import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TrackingScreen.scss';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import {ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH} from 'src/config/const';
import {useTemperatureChartService} from 'src/services/temperature-chart/use-temperature-chart-service';
import {atomicStyles, Colors} from 'src/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgIcon} from 'react3l-native-kit';
import {useTerminalService} from 'src/services/terminal-service/use-terminal-service';
import type {TerminalCommand} from 'src/types/TerminalCommand';

/**
 * File: TrackingScreen.tsx
 * @created 2022-01-06 00:24:14
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ProcessingScreenProps>>}
 */

const TrackingScreen: FC<PropsWithChildren<ProcessingScreenProps>> = (
  props: PropsWithChildren<ProcessingScreenProps>,
): ReactElement => {
  const {} = props;

  const {top} = useSafeAreaInsets();

  const [translate] = useTranslation();

  const [tempArray, , latestTemp] = useTemperatureChartService();

  const [
    listCommand,
    handleExecuteCommand,
    execLoading,
    handleChangeTextCommand,
    command,
  ] = useTerminalService();

  return (
    <>
      <StatusBar translucent={true} animated={true} barStyle={'dark-content'} />
      <View style={[{height: top}]} />
      <View>
        <View style={styles.titleContainer}>
          <Text
            style={[
              atomicStyles.textPrimary,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
              atomicStyles.textCenter,
            ]}>
            {translate('Temperature Tracking')} {`- ${latestTemp?.temp}`}
          </Text>
        </View>

        {/*-------------CHART------------------*/}
        <VictoryChart
          width={SCREEN_WIDTH}
          theme={VictoryTheme.material}
          height={SCREEN_HEIGHT * 0.35}
          style={styles.chart}>
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

        {/*-------------TERMINAL------------------*/}
        <View style={[{height: SCREEN_HEIGHT * 0.4}, styles.terminalContainer]}>
          <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.inputTerminalContainer}>
            <TextInput
              value={command}
              onChangeText={handleChangeTextCommand}
              placeholder={translate('Enter G-Code ...')}
              style={[styles.inputTerminal, atomicStyles.textDark]}
            />
            {execLoading ? (
              <View style={[styles.buttonContainer, atomicStyles.bgPrimary]}>
                <ActivityIndicator color={Colors.White} size={'small'} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleExecuteCommand}
                style={[styles.buttonContainer, atomicStyles.bgPrimary]}>
                <SvgIcon component={require('assets/icons/16/next-ui.svg')} />
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
          <FlatList
            renderItem={({
              item,
              index,
            }: ListRenderItemInfo<TerminalCommand>) => {
              return (
                <View key={index}>
                  <Text style={[atomicStyles.textDark]}>{item?.content}</Text>
                </View>
              );
            }}
            data={listCommand}
            style={styles.terminalWindow}
          />
        </View>
      </View>
    </>
  );
};

export interface ProcessingScreenProps extends StackScreenProps<any> {
  //
}

TrackingScreen.defaultProps = {
  //
};

TrackingScreen.propTypes = {
  //
};

TrackingScreen.displayName = nameof(TrackingScreen);

export default TrackingScreen;
