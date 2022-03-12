import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './PrinterInformationScreen.scss';
import nameof from 'ts-nameof.macro';
import {atomicStyles, Colors} from 'src/styles';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {usePrinterDetail} from 'src/services/network-service/use-printer-detail';
import LoadingComponent from 'src/components/atoms/LoadingComponent';
import {ANDROID} from 'src/config/const';

export function PrinterInformationScreen(
  props: PropsWithChildren<PrinterInformationScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [, loading, detailList, handleGetInfoDetail] = usePrinterDetail();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Printer Detail')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}
        backGround={Colors.Secondary}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              onRefresh={handleGetInfoDetail}
              refreshing={loading}
            />
          }>
          {detailList?.map((item, index) => (
            <View
              key={index}
              style={[styles.itemContainer, atomicStyles.shadow]}>
              <Text style={[atomicStyles.textDark]}>{item?.name}</Text>
              <Text
                style={[
                  atomicStyles.textPrimary,
                  atomicStyles.bold,
                  ANDROID && atomicStyles.androidBold,
                ]}>
                {item?.value}
              </Text>
            </View>
          ))}
        </ScrollView>
      </DefaultLayout>

      <LoadingComponent loading={loading} />
    </>
  );
}

export interface PrinterInformationScreenProps extends StackScreenProps<any> {
  //
}

PrinterInformationScreen.defaultProps = {
  //
};

PrinterInformationScreen.displayName = nameof(PrinterInformationScreen);

export default PrinterInformationScreen;
