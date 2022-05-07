import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SettingScreen.scss';
import {ScrollView, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {SvgIcon} from 'react3l-native-kit';
import SupportItem from 'src/components/morecules/SupportItem/SupportItem';
import {Colors} from 'src/styles';
import {
  ChangeServerScreen,
  EditNetworkInformationScreen,
  GeneralSettingScreen,
  PrinterInformationScreen,
} from 'src/screens/Root';

/**
 * File: SettingScreen.tsx
 * @created 2022-01-06 00:24:25
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SettingScreenProps>>}
 */
const SettingScreen: FC<PropsWithChildren<SettingScreenProps>> = (
  props: PropsWithChildren<SettingScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToScreen = React.useCallback(
    (screen: any) => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  const supportItems = [
    {
      title: translate('Thay đổi IP'),
      onPress: () => handleGoToScreen(ChangeServerScreen.displayName),
      left: <SvgIcon component={require('assets/icons/24/check.svg')} />,
    },

    {
      title: translate('Thông số máy in'),
      onPress: () => handleGoToScreen(PrinterInformationScreen.displayName),
      left: <SvgIcon component={require('assets/icons/24/message-edit.svg')} />,
    },

    // {
    //   title: translate('Thay đổi thông số máy in'),
    //   onPress: () => handleGoToScreen(EditPrinterInformationScreen.displayName),
    //   left: <SvgIcon component={require('assets/icons/24/message-edit.svg')} />,
    // },

    {
      title: translate('Thay đổi thông số mạng'),
      onPress: () => handleGoToScreen(EditNetworkInformationScreen.displayName),
      left: <SvgIcon component={require('assets/icons/24/message-edit.svg')} />,
    },

    // {
    //   title: translate('Thay đổi thông tin chung'),
    //   onPress: () =>
    //     handleGoToScreen(EditPrinterConfigurationScreen.displayName),
    //   left: <SvgIcon component={require('assets/icons/24/message-edit.svg')} />,
    // },

    {
      title: translate('General Setting'),
      onPress: () => handleGoToScreen(GeneralSettingScreen.displayName),
      left: <SvgIcon component={require('assets/icons/24/message-edit.svg')} />,
    },
  ];

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Setting')}
        isLeftIcon={false}
        contentScrollable={true}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            {supportItems?.map((item, index) => (
              <SupportItem
                key={index}
                onPress={item?.onPress!}
                iconL={item?.left}
                iconR={
                  <SvgIcon
                    component={require('assets/icons/24/chevron-right.svg')}
                  />
                }
                title={item?.title}
              />
            ))}
          </ScrollView>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface SettingScreenProps extends StackScreenProps<any> {
  //
}

SettingScreen.defaultProps = {
  //
};

SettingScreen.propTypes = {
  //
};

SettingScreen.displayName = nameof(SettingScreen);

export default SettingScreen;
