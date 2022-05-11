import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './PrintingScreen.scss';
import nameof from 'ts-nameof.macro';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles, Colors} from 'src/styles';
import {SvgIcon} from 'react3l-native-kit';
import {useListSdFileService} from 'src/services/print-service/use-list-sd-file-service';
import PrintingFile from 'src/screens/Tab/PrintingScreen/components/PrintingFile';
import {showInfo} from 'src/helpers/toasty';
import {useBoolean} from 'react3l-common';
import {ANDROID} from 'src/config/const';
import {PrintProgressScreen} from 'src/screens/Root';
import Confirmation from 'src/components/organisms/Confirmation';
import {useProgressServices} from 'src/services/print-service/use-progress-services';
import * as Progress from 'react-native-progress';
import UploadLoadingComponent from 'src/components/organisms/UploadLoadingComponent';
import KeepAwake from 'react-native-keep-awake';

export function PrintingScreen(
  props: PropsWithChildren<PrintingScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  React.useEffect(() => {
    KeepAwake.activate();

    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  const [
    listFile,
    handleGetListSdFile,
    getListLoading,
    handleDeleteFileFromSd,
    handlePrintFileFromSd,
    handleGetFileInStorage,
    ,
    uploadLoading,
    currentFile,
    handleSelectFile,
  ] = useListSdFileService(navigation);

  const [printProgress, handleGetProgress, , , , , , , isAvailable] =
    useProgressServices(navigation, false);

  const [confirmModal, , handleOnConfirmModal, handleOffConfirmModal] =
    useBoolean(false);

  const handleGoToPrintProgressScreen = React.useCallback(() => {
    if (true) {
      navigation.navigate(PrintProgressScreen.displayName!, {
        fileName: currentFile,
      });
    } else {
      showInfo(translate('file.selectFilePrint'));
    }
  }, [currentFile, navigation, translate]);

  const handleConfirmPrint = React.useCallback(
    (file: string) => {
      handleOnConfirmModal();

      handleSelectFile(file);
    },
    [handleOnConfirmModal, handleSelectFile],
  );

  const handleCancelPrintConfirm = React.useCallback(() => {
    handleOffConfirmModal();

    handleSelectFile('');
  }, [handleOffConfirmModal, handleSelectFile]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetListSdFile();

      handleGetProgress();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetListSdFile, handleGetProgress, navigation]);

  const handleRefresh = React.useCallback(() => {
    handleGetProgress();

    handleGetListSdFile();
  }, [handleGetListSdFile, handleGetProgress]);

  return (
    <>
      <StatusBar
        translucent={true}
        animated={true}
        barStyle={'light-content'}
      />
      <DefaultLayout
        customHeader={false}
        title={translate('tab.sdCard')}
        isLeftIcon={true}
        left={<View style={styles.placeholder} />}
        contentScrollable={true}
        right={
          <SvgIcon component={require('assets/icons/24/white-export.svg')} />
        }
        onRightPress={handleGetFileInStorage}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          <View style={styles.headerTitle}>
            <View
              style={[
                atomicStyles.flexRow,
                atomicStyles.justifyContentBetween,
              ]}>
              {listFile?.length && (
                <Text style={[atomicStyles.textDark]}>
                  <Text
                    style={[
                      atomicStyles.textPrimary,
                      atomicStyles.bold,
                      ANDROID && atomicStyles.androidBold,
                    ]}>
                    {listFile?.length} {translate('file.file')}
                  </Text>{' '}
                  {translate('file.found')}
                </Text>
              )}

              {uploadLoading && (
                <View
                  style={[atomicStyles.flexRow, atomicStyles.alignItemsCenter]}>
                  <Text
                    style={[
                      atomicStyles.textDark,
                      atomicStyles.textPrimary,
                      atomicStyles.bold,
                      ANDROID && atomicStyles.androidBold,
                      atomicStyles.mr2,
                    ]}>
                    {translate('file.uploadingFile')}
                  </Text>
                  <ActivityIndicator color={Colors.Primary} size={'small'} />
                </View>
              )}
            </View>
          </View>

          <FlatList
            renderItem={({item, index}: ListRenderItemInfo<string>) => {
              return (
                <PrintingFile
                  key={index}
                  title={item}
                  onDelete={() => handleDeleteFileFromSd(item!)}
                  onPrint={() => {
                    handleConfirmPrint(item!);
                  }}
                />
              );
            }}
            data={listFile}
            style={styles.flatList}
            keyExtractor={(_item, index) => index.toString()}
            refreshing={getListLoading}
            onRefresh={handleRefresh}
          />
        </View>

        <TouchableOpacity
          onPress={handleGoToPrintProgressScreen}
          style={[styles.smallProgress, atomicStyles.shadow]}>
          {isAvailable ? (
            <Text
              style={[
                atomicStyles.textSecondary,
                atomicStyles.bold,
                ANDROID && atomicStyles.androidBold,
                styles.availableText,
              ]}>
              {translate('file.available')}
            </Text>
          ) : (
            <Progress.Circle
              progress={printProgress}
              size={55}
              animated={true}
              showsText={true}
              textStyle={styles.textProgress}
              thickness={5}
              borderColor={'#ffffff'}
            />
          )}
        </TouchableOpacity>
      </DefaultLayout>

      <Confirmation
        isVisible={confirmModal}
        onBackdropPress={handleCancelPrintConfirm}
        title={translate('app.confirm')}
        subtitle={translate('file.askPrintFile') + ` ${currentFile}?`}
        labelSecondary={translate('app.no')}
        onPressSecondary={handleCancelPrintConfirm}
        labelPrimary={translate('app.yes')}
        onPressPrimary={() => {
          handlePrintFileFromSd();
          handleOffConfirmModal();
        }}
      />

      <UploadLoadingComponent isVisible={uploadLoading} />
    </>
  );
}

export interface PrintingScreenProps extends StackScreenProps<any> {
  //
}

PrintingScreen.defaultProps = {
  //
};

PrintingScreen.displayName = nameof(PrintingScreen);

export default PrintingScreen;
