import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import {ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {atomicStyles, Colors} from 'src/styles';
import {useMoveCommandService} from 'src/services/command-service/use-move-command-service';
import {usePositionCommandService} from 'src/services/command-service/use-position-command-service';
import AddIcon from 'assets/tsx/24/AddIcon';
import ControllerButton from 'src/screens/Tab/HomeScreen/components/ControllerButton';
import MinusIcon from 'assets/tsx/24/MinusIcon';
import HomeIcon from 'assets/tsx/24/HomeIcon';
import {ANDROID} from 'src/config/const';
import {SvgIcon} from 'react3l-native-kit';
import TemperatureControl from 'src/screens/Tab/HomeScreen/components/TemperatureControl';
import {Button} from 'src/components/atoms';
import {useExtruderCommandService} from 'src/services/command-service/use-extruder-command-service';
import {useFanCommandService} from 'src/services/command-service/use-fan-command-service';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useExtruderFilament} from 'src/services/command-service/use-extruder-filament';

/**
 * File: HomeScreen.tsx
 * @created 2022-01-06 00:24:02
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<HomeScreenProps>>}
 */

export const lengthController = [
  {id: 1, length: 0.1},
  {id: 2, length: 1},
  {id: 3, length: 10},
  {id: 4, length: 100},
];

const HomeScreen: FC<PropsWithChildren<HomeScreenProps>> = (
  props: PropsWithChildren<HomeScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [selectedLength, setSelectedLength] = React.useState<any>(
    lengthController[0],
  );

  const {top} = useSafeAreaInsets();

  const handleChangeLength = React.useCallback((item: any) => {
    setSelectedLength(item);
  }, []);

  const [printerPosition, handleGetCurrentPosition, ,] =
    usePositionCommandService();

  const [
    handleMoveCustom,
    handleAutoHome,
    handleXHome,
    handleYHome,
    handleZHome,
  ] = useMoveCommandService(handleGetCurrentPosition);

  const [currentTemp, handleGetCurrentTemp, , handleSendTemperatureCommand] =
    useExtruderCommandService();

  const [fanSpeed, handleSendFanSpeedCommand] = useFanCommandService();

  const [
    extruderFilament,
    handleChangeFilamentLength,
    handleChangeExtruderRate,
    handleSendCommandExtruderFilament,
  ] = useExtruderFilament();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetCurrentTemp();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetCurrentTemp, navigation]);

  return (
    <>
      <StatusBar translucent={true} animated={true} barStyle={'dark-content'} />
      <View style={[{height: top}]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.positionSection, atomicStyles.bgWhite]}>
          <Text
            style={[
              atomicStyles.textPrimary,
              styles.positionText,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
            ]}>
            {translate('control.xAxis')}: {printerPosition.X}
          </Text>
          <View style={[styles.verticalSeparator, atomicStyles.bgPrimary]} />
          <Text
            style={[
              atomicStyles.textPrimary,
              styles.positionText,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
            ]}>
            {translate('control.yAxis')}: {printerPosition.Y}
          </Text>
          <View style={[styles.verticalSeparator, atomicStyles.bgPrimary]} />
          <Text
            style={[
              atomicStyles.textPrimary,
              styles.positionText,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
            ]}>
            {translate('control.zAxis')}: {printerPosition.Z}
          </Text>
        </View>

        <View style={styles.upperController}>
          <View style={styles.leftUpperController}>
            <View style={styles.middleLeftUpperController}>
              <ControllerButton onPress={handleYHome}>
                <Text
                  style={[
                    styles.homeTextStyle,
                    atomicStyles.textPrimary,
                    atomicStyles.bold,
                    ANDROID && atomicStyles.androidBold,
                  ]}>
                  {translate('control.yAxis')}
                </Text>
                <SvgIcon
                  component={require('assets/icons/16/home.svg')}
                  style={styles.homeAxis}
                />
              </ControllerButton>
              <ControllerButton
                onPress={() => {
                  handleMoveCustom({Y: selectedLength?.length});
                }}
                style={styles.middleTopButton}>
                <AddIcon />
              </ControllerButton>
              <View style={styles.emptyController} />
            </View>
            <View style={styles.middleLeftUpperController}>
              <ControllerButton
                onPress={() => {
                  handleMoveCustom({X: -1 * selectedLength?.length});
                }}>
                <MinusIcon />
              </ControllerButton>

              <ControllerButton
                onPress={handleAutoHome}
                style={styles.middleButton}>
                <HomeIcon />
              </ControllerButton>

              <ControllerButton
                onPress={() => {
                  handleMoveCustom({X: selectedLength?.length});
                }}>
                <AddIcon />
              </ControllerButton>
            </View>
            <View style={styles.middleLeftUpperController}>
              <View style={styles.emptyController} />

              <ControllerButton
                onPress={() => {
                  handleMoveCustom({Y: -1 * selectedLength?.length});
                }}
                style={styles.middleTopButton}>
                <MinusIcon />
              </ControllerButton>

              <ControllerButton onPress={handleXHome}>
                <Text
                  style={[
                    styles.homeTextStyle,
                    atomicStyles.textPrimary,
                    atomicStyles.bold,
                    ANDROID && atomicStyles.androidBold,
                  ]}>
                  {translate('control.xAxis')}
                </Text>
                <SvgIcon
                  component={require('assets/icons/16/home.svg')}
                  style={styles.homeAxis}
                />
              </ControllerButton>
            </View>
          </View>

          <View style={styles.rightUpperController}>
            <ControllerButton
              onPress={() => {
                handleMoveCustom({Z: selectedLength?.length});
              }}>
              <AddIcon />
            </ControllerButton>

            <ControllerButton onPress={handleZHome} style={styles.middleButton}>
              <Text
                style={[
                  styles.homeTextStyle,
                  atomicStyles.textPrimary,
                  atomicStyles.bold,
                  ANDROID && atomicStyles.androidBold,
                ]}>
                {translate('control.zAxis')}
              </Text>
              <SvgIcon
                component={require('assets/icons/16/home.svg')}
                style={styles.homeAxis}
              />
            </ControllerButton>

            <ControllerButton
              onPress={() => {
                handleMoveCustom({Z: -1 * selectedLength?.length});
              }}>
              <MinusIcon />
            </ControllerButton>
          </View>
        </View>

        <View style={styles.lengthSelector}>
          {lengthController?.map((item, index) => (
            <ControllerButton
              onPress={() => {
                handleChangeLength(item);
              }}
              key={index}
              style={[
                selectedLength?.id === item?.id && atomicStyles.bgPrimary,
              ]}>
              <Text
                style={[
                  atomicStyles.textPrimary,
                  atomicStyles.bold,
                  ANDROID && atomicStyles.androidBold,
                  selectedLength?.id === item?.id && atomicStyles.textWhite,
                ]}>
                {item?.length}
              </Text>
            </ControllerButton>
          ))}
        </View>

        <View style={[styles.extruderContainer, atomicStyles.bgWhite]}>
          <Text
            style={[
              atomicStyles.textPrimary,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
            ]}>
            {translate('control.extruder')}
          </Text>

          <View style={[styles.dropdownContainer]}>
            <View style={styles.dropdown}>
              <View style={[styles.inputContainer]}>
                <TextInput
                  onChangeText={(value: string) => {
                    handleChangeFilamentLength(parseInt(value));
                  }}
                  style={[
                    atomicStyles.textDark,
                    atomicStyles.bold,
                    ANDROID && atomicStyles.androidBold,
                    styles.extruderInput,
                  ]}
                  placeholderTextColor={Colors.Gray}
                  defaultValue={extruderFilament.length.toString()}
                  placeholder={translate('control.filamentLength')}
                  keyboardType={'number-pad'}
                />
                <Text style={[atomicStyles.textPrimary]}>
                  {translate('control.mm')}
                </Text>
              </View>

              <View style={[atomicStyles.mt8px, styles.inputContainer]}>
                <TextInput
                  onChangeText={(value: string) => {
                    handleChangeExtruderRate(parseInt(value));
                  }}
                  style={[
                    atomicStyles.textDark,
                    atomicStyles.bold,
                    ANDROID && atomicStyles.androidBold,
                    styles.extruderInput,
                  ]}
                  keyboardType={'number-pad'}
                  placeholderTextColor={Colors.Gray}
                  defaultValue={extruderFilament.extruderRate.toString()}
                  placeholder={translate('control.extruderSpeed')}
                />
                <Text style={[atomicStyles.textPrimary]}>
                  {translate('control.extruderSpeedPerMin')}
                </Text>
              </View>
            </View>
            <View style={[styles.extruderSelectionContainer]}>
              <Button
                title={translate('control.backward')}
                onPress={() => handleSendCommandExtruderFilament(false)}
                isOutlined={true}
                buttonStyle={[styles.extruderButton]}
                buttonContainerStyle={styles.extruderButtonContainer}
              />
              <Button
                title={translate('control.forward')}
                onPress={() => handleSendCommandExtruderFilament(true)}
                isOutlined={false}
                buttonStyle={styles.forwardContainer}
                buttonContainerStyle={styles.extruderButtonContainer}
              />
            </View>
          </View>
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
          currentValue={Math.round(fanSpeed * 255)}
          onConfirm={handleSendFanSpeedCommand}
        />
      </ScrollView>
    </>
  );
};

export interface HomeScreenProps extends StackScreenProps<any> {
  //
}

HomeScreen.defaultProps = {
  //
};

HomeScreen.propTypes = {
  //
};

HomeScreen.displayName = nameof(HomeScreen);

export default HomeScreen;
