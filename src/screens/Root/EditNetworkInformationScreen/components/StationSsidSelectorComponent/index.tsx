import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './StationSsidSelectorComponent.scss';
import nameof from 'ts-nameof.macro';
import {useBoolean} from 'react3l-common';
import {Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import {SvgIcon} from 'react3l-native-kit';
import type {StackScreenProps} from '@react-navigation/stack';
import {commandRepository} from 'src/repositories/command-repository';
import {GCode} from 'src/config/g-code';
import {showInfo} from 'src/helpers/toasty';

export function StationSsidSelectorComponent(
  props: PropsWithChildren<StationSsidSelectorComponentProps>,
): ReactElement {
  const {title, initialValue, P, T, listValue} = props;

  const [isShowDropdown, handleToggleDropdown, , handleOffDropdown] =
    useBoolean(false);

  const [selectedValue, setSelectedValue] =
    React.useState<string>(initialValue);

  React.useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleChangeDropdown = React.useCallback(
    (item: string) => {
      setSelectedValue(item);

      handleOffDropdown();
    },
    [handleOffDropdown],
  );

  const handleSubmitNetworkConfig = React.useCallback(
    (P: number, T: number | string, V: string | number) => {
      commandRepository
        .sendCommandPlain(
          `${GCode.SubmitNetworkConfiguration}P=${P} T=${T} V=${V}`,
        )
        .subscribe({
          next: (result: string) => {
            showInfo(result);
          },
          error: () => {},
        });
    },
    [],
  );

  const handleSubmitValue = React.useCallback(() => {
    handleSubmitNetworkConfig(P, T, selectedValue);
  }, [P, T, handleSubmitNetworkConfig, selectedValue]);

  return (
    <>
      <View style={[atomicStyles.mb1, atomicStyles.mt4]}>
        <Text
          style={[
            atomicStyles.textSecondary,
            atomicStyles.bold,
            ANDROID && atomicStyles.androidBold,
          ]}>
          {title}
        </Text>

        <View
          style={[
            atomicStyles.flexRow,
            atomicStyles.alignItemsCenter,
            atomicStyles.justifyContentBetween,
            styles.choiceContainer,
          ]}>
          <View style={[{width: '85%'}]}>
            <>
              <TouchableOpacity
                onPress={() => handleToggleDropdown()}
                style={[
                  styles.contentContainer,
                  atomicStyles.flexRow,
                  atomicStyles.alignItemsCenter,
                  atomicStyles.justifyContentBetween,
                ]}>
                <Text style={[atomicStyles.textDark, atomicStyles.text]}>
                  {selectedValue}
                </Text>

                <View>
                  {isShowDropdown ? (
                    <SvgIcon
                      component={require('assets/icons/16/arrow-up.svg')}
                    />
                  ) : (
                    <SvgIcon
                      component={require('assets/icons/16/arrow-down.svg')}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </>
          </View>

          <TouchableOpacity
            style={[atomicStyles.bgPrimary, styles.buttonConfirmContainer]}
            onPress={handleSubmitValue}>
            <SvgIcon
              component={require('assets/icons/24/white-arrow-right.svg')}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isShowDropdown && (
        <View style={styles.dropdownContainer}>
          {/*<View>*/}
          {/*  <TouchableOpacity onPress={onRefreshList}>*/}
          {/*    <SvgIcon component={require('assets/icons/24/check.svg')} />*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
          {listValue?.map((item: any, index: number) => (
            <TouchableOpacity
              onPress={() => handleChangeDropdown(item?.SSID)}
              key={index}
              style={[
                styles.itemChoice,
                item?.SSID === selectedValue && atomicStyles.bgPrimary,
              ]}>
              <Text
                style={[
                  atomicStyles.textDark,
                  atomicStyles.text,
                  item?.SSID === selectedValue && atomicStyles.textWhite,
                ]}>
                {item?.SSID}
              </Text>

              <View
                style={[
                  atomicStyles.flexRow,
                  atomicStyles.alignItemsCenter,
                  atomicStyles.justifyContentBetween,
                  styles.itemRight,
                ]}>
                <Text
                  style={[
                    atomicStyles.text,
                    item?.SSID === selectedValue && atomicStyles.textWhite,
                  ]}>
                  {item?.SIGNAL}%
                </Text>

                {item?.IS_PROTECTED === '1' &&
                  (item?.SSID === selectedValue ? (
                    <SvgIcon
                      component={require('assets/icons/24/white-lock.svg')}
                    />
                  ) : (
                    <SvgIcon
                      component={require('assets/icons/24/dark-lock.svg')}
                    />
                  ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

export interface StationSsidSelectorComponentProps {
  //

  title?: string;

  listValue?: any[];

  initialValue?: any;

  onConfirm?: (value: any) => void;

  navigation?: StackScreenProps<any>['navigation'];

  onRefreshList?: () => void;

  P?: any;

  T?: any;
}

StationSsidSelectorComponent.defaultProps = {
  //
};

StationSsidSelectorComponent.displayName = nameof(StationSsidSelectorComponent);

export default StationSsidSelectorComponent;
