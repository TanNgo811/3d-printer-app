import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './EditNetworkInformationScreen.scss';
import nameof from 'ts-nameof.macro';
import {ScrollView} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {useNetworkService} from 'src/services/network-service/use-network-service';
import {
  apAuthenticationList,
  apChannelList,
  apIpModeList,
  apNetworkModeList,
  autoNotificationList,
  baudRateList,
  notificationModeList,
  sleepModeList,
  ssidVisibleList,
  stationIpModeList,
  stationNetworkModeList,
  wifiModeList,
} from 'src/config/network-config';
import ConfigItemComponent from 'src/components/morecules/ConfigItemComponent';
import StationSsidSelectorComponent from 'src/screens/Root/EditNetworkInformationScreen/components/StationSsidSelectorComponent';

export function EditNetworkInformationScreen(
  props: PropsWithChildren<EditNetworkInformationScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [, networkConfig, listSSID, handleGetListSSID, ,] = useNetworkService();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('setting.networkSetting')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}>
          <>
            {/*//BaudRate*/}
            <ConfigItemComponent
              title={translate('setting.baudRate')}
              type={'dropdown'}
              listValue={baudRateList}
              initialValue={networkConfig && networkConfig![0]?.V}
              P={networkConfig && networkConfig![0]?.P}
              T={networkConfig && networkConfig![0]?.T}
            />

            {/*//SleepMode*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.sleepMode')}
              type={'dropdown'}
              initialValue={networkConfig && networkConfig![1]?.V}
              listValue={sleepModeList}
              P={networkConfig && networkConfig![1]?.P}
              T={networkConfig && networkConfig![1]?.T}
            />

            {/*//Web Port*/}
            <ConfigItemComponent
              title={translate('setting.webPort')}
              type={'input'}
              initialValue={networkConfig && networkConfig![2]?.V}
              P={networkConfig && networkConfig![2]?.P}
              T={networkConfig && networkConfig![2]?.T}
            />

            {/*//Data Port*/}
            <ConfigItemComponent
              title={translate('setting.dataPort')}
              type={'input'}
              initialValue={networkConfig && networkConfig![3]?.V}
              P={networkConfig && networkConfig![3]?.P}
              T={networkConfig && networkConfig![3]?.T}
            />

            {/*/Host Name*/}
            <ConfigItemComponent
              title={translate('setting.hostName')}
              type={'input'}
              initialValue={networkConfig && networkConfig![4]?.V}
              P={networkConfig && networkConfig![4]?.P}
              T={networkConfig && networkConfig![4]?.T}
            />

            {/*//Wifi Mode*/}
            <ConfigItemComponent
              title={translate('setting.wifiMode')}
              type={'dropdown'}
              listValue={wifiModeList}
              initialValue={networkConfig && networkConfig![5]?.V}
              P={networkConfig && networkConfig![5]?.P}
              T={networkConfig && networkConfig![5]?.T}
            />

            {/*/Station SSID*/}
            <StationSsidSelectorComponent
              title={translate('setting.stationSSID')}
              onRefreshList={handleGetListSSID}
              listValue={listSSID}
              initialValue={networkConfig && networkConfig![6]?.V}
              P={networkConfig && networkConfig![6]?.P}
              T={networkConfig && networkConfig![6]?.T}
            />

            {/*/Station Password*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationPassword')}
              type={'input'}
              initialValue={networkConfig && networkConfig![7]?.V}
              P={networkConfig && networkConfig![7]?.P}
              T={networkConfig && networkConfig![7]?.T}
            />

            {/*/Station Network Mode*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationNetworkMode')}
              type={'dropdown'}
              listValue={stationNetworkModeList}
              initialValue={networkConfig && networkConfig![8]?.V}
              P={networkConfig && networkConfig![8]?.P}
              T={networkConfig && networkConfig![8]?.T}
            />

            {/*/Station IP Mode*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationIpMode')}
              type={'dropdown'}
              listValue={stationIpModeList}
              initialValue={networkConfig && networkConfig![9]?.V}
              P={networkConfig && networkConfig![9]?.P}
              T={networkConfig && networkConfig![9]?.T}
            />

            {/*//Station Static IP*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationStaticIp')}
              type={'input'}
              initialValue={networkConfig && networkConfig![10]?.V}
              P={networkConfig && networkConfig![10]?.P}
              T={networkConfig && networkConfig![10]?.T}
            />

            {/*//Station Static Mask*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationStaticMask')}
              type={'input'}
              initialValue={networkConfig && networkConfig![11]?.V}
              P={networkConfig && networkConfig![11]?.P}
              T={networkConfig && networkConfig![11]?.T}
            />

            {/*/Station Static Gateway*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.stationStaticGateway')}
              type={'input'}
              initialValue={networkConfig && networkConfig![12]?.V}
              P={networkConfig && networkConfig![12]?.P}
              T={networkConfig && networkConfig![12]?.T}
            />

            {/*/AP SSID*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apSsid')}
              type={'input'}
              initialValue={networkConfig && networkConfig![13]?.V}
              P={networkConfig && networkConfig![13]?.P}
              T={networkConfig && networkConfig![13]?.T}
            />

            {/*AP Password*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apPassword')}
              type={'input'}
              initialValue={networkConfig && networkConfig![14]?.V}
              P={networkConfig && networkConfig![14]?.P}
              T={networkConfig && networkConfig![14]?.T}
            />

            {/*/AP Network Mode*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apNetworkMode')}
              type={'dropdown'}
              listValue={apNetworkModeList}
              initialValue={networkConfig && networkConfig![15]?.V}
              P={networkConfig && networkConfig![15]?.P}
              T={networkConfig && networkConfig![15]?.T}
            />

            {/*/SSID Visible*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.ssidVisible')}
              type={'input'}
              initialValue={networkConfig && networkConfig![16]?.V}
              listValue={ssidVisibleList}
              P={networkConfig && networkConfig![16]?.P}
              T={networkConfig && networkConfig![16]?.T}
            />

            {/*/AP Channel*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apChannel')}
              type={'dropdown'}
              listValue={apChannelList}
              initialValue={networkConfig && networkConfig![17]?.V}
              P={networkConfig && networkConfig![17]?.P}
              T={networkConfig && networkConfig![17]?.T}
            />

            {/*/Authentication*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.authentication')}
              type={'dropdown'}
              listValue={apAuthenticationList}
              initialValue={networkConfig && networkConfig![18]?.V}
              P={networkConfig && networkConfig![18]?.P}
              T={networkConfig && networkConfig![18]?.T}
            />

            {/*/AP IP Mode*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apIpMode')}
              type={'dropdown'}
              listValue={apIpModeList}
              initialValue={networkConfig && networkConfig![19]?.V}
              P={networkConfig && networkConfig![19]?.P}
              T={networkConfig && networkConfig![19]?.T}
            />

            {/*AP Static IP*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apStaticIp')}
              type={'input'}
              initialValue={networkConfig && networkConfig![20]?.V}
              P={networkConfig && networkConfig![20]?.P}
              T={networkConfig && networkConfig![20]?.T}
            />

            {/*AP Static Mask*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.apStaticMask')}
              type={'input'}
              initialValue={networkConfig && networkConfig![21]?.V}
              P={networkConfig && networkConfig![21]?.P}
              T={networkConfig && networkConfig![21]?.T}
            />

            {/*AP Static Gateway*/}
            <ConfigItemComponent
              title={translate('setting.apStaticGateway')}
              type={'input'}
              initialValue={networkConfig && networkConfig![22]?.V}
              P={networkConfig && networkConfig![22]?.P}
              T={networkConfig && networkConfig![22]?.T}
            />

            {/*Notification*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.notification')}
              type={'dropdown'}
              listValue={notificationModeList}
              initialValue={networkConfig && networkConfig![23]?.V}
              P={networkConfig && networkConfig![23]?.P}
              T={networkConfig && networkConfig![23]?.T}
            />

            {/*Token 1*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.token1')}
              type={'input'}
              initialValue={networkConfig && networkConfig![24]?.V}
              P={networkConfig && networkConfig![24]?.P}
              T={networkConfig && networkConfig![24]?.T}
            />

            {/*Token 2*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.token2')}
              type={'input'}
              initialValue={networkConfig && networkConfig![25]?.V}
              P={networkConfig && networkConfig![25]?.P}
              T={networkConfig && networkConfig![25]?.T}
            />

            {/*Notification setting*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.notificationSetting')}
              type={'input'}
              initialValue={networkConfig && networkConfig![26]?.V}
              P={networkConfig && networkConfig![26]?.P}
              T={networkConfig && networkConfig![26]?.T}
            />

            {/*/Auto Notification*/}
            <ConfigItemComponent
              onConfirm={() => {}}
              title={translate('setting.autoNotification')}
              type={'dropdown'}
              listValue={autoNotificationList}
              initialValue={networkConfig && networkConfig![27]?.V}
              P={networkConfig && networkConfig![27]?.P}
              T={networkConfig && networkConfig![27]?.T}
            />
          </>
        </ScrollView>
      </DefaultLayout>
    </>
  );
}

export interface EditNetworkInformationScreenProps
  extends StackScreenProps<any> {
  //
}

EditNetworkInformationScreen.defaultProps = {
  //
};

EditNetworkInformationScreen.displayName = nameof(EditNetworkInformationScreen);

export default EditNetworkInformationScreen;
