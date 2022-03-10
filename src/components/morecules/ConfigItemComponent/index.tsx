import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './ConfigItemComponent.scss';
import nameof from 'ts-nameof.macro';
import {atomicStyles} from 'src/styles';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ANDROID} from 'src/config/const';
import {SvgIcon} from 'react3l-native-kit';
import {useBoolean} from 'react3l-common';
import type {StackScreenProps} from '@react-navigation/stack';
import {commandRepository} from 'src/repositories/command-repository';
import {GCode} from 'src/config/g-code';
import {showInfo} from 'src/helpers/toasty';

export function ConfigItemComponent(
  props: PropsWithChildren<ConfigItemComponentProps>,
): ReactElement {
  const {type, title, initialValue, listValue, P, T} = props;

  const [isShowDropdown, handleToggleDropdown, , handleOffDropdown] =
    useBoolean(false);

  const [selectedValue, setSelectedValue] = React.useState<string | number>(
    initialValue,
  );

  React.useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

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

  const handleChangeDropdown = React.useCallback(
    (item: string | number) => {
      setSelectedValue(item);

      handleOffDropdown();
    },
    [handleOffDropdown],
  );

  const handleChangeText = React.useCallback((item: string) => {
    setSelectedValue(item);
  }, []);

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
            {type === 'dropdown' && (
              <>
                <TouchableOpacity
                  onPress={() => handleToggleDropdown()}
                  style={[
                    styles.contentContainer,
                    atomicStyles.flexRow,
                    atomicStyles.alignItemsCenter,
                    atomicStyles.justifyContentBetween,
                  ]}>
                  <Text style={[atomicStyles.text]}>
                    {
                      listValue?.find(item => item?.code === selectedValue)
                        ?.name
                    }
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
            )}
            {type === 'input' && (
              <View style={styles.contentContainer}>
                <TextInput
                  style={[
                    atomicStyles.text,
                    atomicStyles.textSecondary,
                    styles.textInput,
                  ]}
                  onChangeText={handleChangeText}
                  defaultValue={initialValue}
                  placeholder={'typing...'}
                />
              </View>
            )}
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
          {listValue?.map((item: any, index: number) => (
            <TouchableOpacity
              onPress={() => handleChangeDropdown(item?.code)}
              key={index}
              style={[
                styles.itemChoice,
                item?.code === selectedValue && atomicStyles.bgPrimary,
              ]}>
              <Text
                style={[
                  atomicStyles.text,
                  item?.code === selectedValue && atomicStyles.textWhite,
                ]}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

export interface ConfigItemComponentProps {
  //

  type?: 'dropdown' | 'input';

  title?: string;

  listValue?: any[];

  initialValue?: any;

  onConfirm?: (value: any) => void;

  navigation?: StackScreenProps<any>['navigation'];

  P?: any;

  T?: any;
}

ConfigItemComponent.defaultProps = {
  //
};

ConfigItemComponent.displayName = nameof(ConfigItemComponent);

export default ConfigItemComponent;
