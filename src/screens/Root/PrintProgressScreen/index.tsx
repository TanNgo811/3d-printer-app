import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './PrintProgressScreen.scss';
import nameof from 'ts-nameof.macro';
import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import {ANDROID} from 'src/config/const';
import RoundButton from 'src/components/atoms/RoundButton';
import {useProgressServices} from 'src/services/print-service/use-progress-services';
import TemperatureControl from 'src/screens/Tab/HomeScreen/components/TemperatureControl';
import {useExtruderCommandService} from 'src/services/command-service/use-extruder-command-service';
import {useFanCommandService} from 'src/services/command-service/use-fan-command-service';

export function PrintProgressScreen(
  props: PropsWithChildren<PrintOnProcessScreenProps>,
): ReactElement {
  const {navigation, route} = props;

  const {fileName} = route?.params ?? {};

  const [translate] = useTranslation();

  const [
    progress,
    ,
    handleStartProgress,
    handlePauseProgress,
    handleAbortProgress,
    handleMoveToHomePosition,
    isPrinting,
    handlePrintSDFile,
  ] = useProgressServices(navigation, true);

  const [currentTemp, , , handleSendTemperatureCommand] =
    useExtruderCommandService();

  const [, handleSendFanSpeedCommand] = useFanCommandService();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('progress.title')}
        isLeftIcon={true}
        onLeftPress={() => navigation.goBack()}
        contentScrollable={true}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <View style={styles.progress}>
              <Progress.Circle
                progress={progress}
                size={150}
                animated={true}
                color={Colors.Primary}
                showsText={true}
                thickness={5}
              />
            </View>

            <View style={styles.fileNameContainer}>
              <Text
                style={[
                  atomicStyles.textPrimary,
                  atomicStyles.bold,
                  ANDROID && atomicStyles.androidBold,
                  styles.fileName,
                ]}>
                {translate('progress.file')}
                {fileName}
              </Text>
            </View>

            <View style={[atomicStyles.mt4]}>
              <Text style={[atomicStyles.text, atomicStyles.textDark]}>
                {translate('progress.timePrint')}
              </Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <RoundButton
              icon={require('assets/icons/24/white-home.svg')}
              title={translate('progress.home')}
              onPress={handleMoveToHomePosition}
            />
            {isPrinting ? (
              <RoundButton
                icon={require('assets/icons/24/white-pause.svg')}
                title={translate('progress.pause')}
                onPress={handlePauseProgress}
              />
            ) : (
              <RoundButton
                icon={require('assets/icons/24/white-play.svg')}
                title={translate('progress.play')}
                onPress={handleStartProgress}
              />
            )}

            <RoundButton
              icon={require('assets/icons/24/white-refresh.svg')}
              title={translate('progress.reset')}
              onPress={() => handlePrintSDFile(fileName)}
            />

            <RoundButton
              icon={require('assets/icons/24/white-forbinden.svg')}
              title={translate('progress.abort')}
              onPress={handleAbortProgress}
            />
          </View>

          <TemperatureControl
            title={translate('control.temperature')}
            maxValue={280}
            currentValue={currentTemp}
            onConfirm={handleSendTemperatureCommand}
          />

          <TemperatureControl
            title={translate('control.bed')}
            maxValue={120}
            currentValue={0}
            onChangeSlide={() => {}}
          />

          <TemperatureControl
            title={translate('control.fan')}
            maxValue={255}
            currentValue={0}
            onConfirm={handleSendFanSpeedCommand}
          />
        </View>
      </DefaultLayout>
    </>
  );
}

export interface PrintOnProcessScreenProps extends StackScreenProps<any> {
  //
}

PrintProgressScreen.defaultProps = {
  //
};

PrintProgressScreen.displayName = nameof(PrintProgressScreen);

export default PrintProgressScreen;
