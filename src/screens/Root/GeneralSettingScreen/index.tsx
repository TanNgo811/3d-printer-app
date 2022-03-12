import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './GeneralSettingScreen.scss';
import nameof from 'ts-nameof.macro';
import {View} from 'react-native';
import {Colors} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {SvgIcon} from 'react3l-native-kit';
import SupportItem from 'src/components/morecules/SupportItem/SupportItem';
import {GeneralSettingLanguageScreen} from 'src/screens/Root';
import {usePrinterRestart} from 'src/services/command/use-printer-restart';
import {useBoolean} from 'react3l-common';
import Confirmation from 'src/components/organisms/Confirmation';

export function GeneralSettingScreen(
  props: PropsWithChildren<GeneralSettingScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToScreen = React.useCallback(
    (screen: string) => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  const [modal, , handleOnModal, handleOffModal] = useBoolean(false);

  const [, handleResetPrinter] = usePrinterRestart();

  const supportItems = [
    {
      title: translate('Thay đổi ngôn ngữ'),
      onPress: () => handleGoToScreen(GeneralSettingLanguageScreen.displayName),
      left: <SvgIcon component={require('assets/icons/24/check.svg')} />,
    },

    {
      title: translate('Restart Printer'),
      onPress: handleOnModal,
      left: <SvgIcon component={require('assets/icons/24/check.svg')} />,
    },
  ];

  const handleConfirm = React.useCallback(() => {
    handleResetPrinter();

    handleOffModal();
  }, [handleOffModal, handleResetPrinter]);

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('General Setting')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          {supportItems?.map((item: any, index: number) => (
            <SupportItem
              key={index}
              onPress={item?.onPress}
              iconL={item?.left}
              iconR={
                <SvgIcon
                  component={require('assets/icons/24/chevron-right.svg')}
                />
              }
              title={item?.title}
            />
          ))}
        </View>
      </DefaultLayout>

      <Confirmation
        isVisible={modal}
        title={translate('Bạn có muốn restart printer')}
        labelPrimary={'Có'}
        onPressPrimary={handleConfirm}
        labelSecondary={'Nope'}
        onPressSecondary={handleOffModal}
      />
    </>
  );
}

export interface GeneralSettingScreenProps extends StackScreenProps<any> {
  //
}

GeneralSettingScreen.defaultProps = {
  //
};

GeneralSettingScreen.displayName = nameof(GeneralSettingScreen);

export default GeneralSettingScreen;
