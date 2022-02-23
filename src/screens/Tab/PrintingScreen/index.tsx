import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './PrintingScreen.scss';
import nameof from 'ts-nameof.macro';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles, Colors} from 'src/styles';
import {SvgIcon} from 'react3l-native-kit';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useListSdFileService} from 'src/services/print-service/use-list-sd-file-service';
import PrintingFile from 'src/screens/Tab/PrintingScreen/components/PrintingFile';
import {uploadRepository} from 'src/repositories/upload-repository';
import {showError} from 'src/helpers/toasty';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';

export function PrintingScreen(
  props: PropsWithChildren<PrintingScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [progress, setProgress] = React.useState<number>(0);

  const [uploadLoading, , handleOnUploadLoading, handleOffUploadLoading] =
    useBoolean(false);

  const handleUploadProgress = React.useCallback((progressEvent: any) => {
    setProgress((progressEvent.loaded / progressEvent.total) * 100);
  }, []);

  const [
    listFile,
    handleGetListSdFile,
    getListLoading,
    handleDeleteFileFromSd,
    handlePrintFileFromSd,
  ] = useListSdFileService();

  const handleGetFileInStorage = React.useCallback(() => {
    DocumentPicker.pickSingle({
      allowMultiSelection: false,
    })
      .then((result: DocumentPickerResponse) => {
        console.log(result);
        handleOnUploadLoading();
        uploadRepository
          .uploadFile(result, event => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
          .pipe(finalize(() => handleOffUploadLoading()))
          .subscribe({
            next: end => {
              console.log('uploadFile', end);
              setProgress(0);
              handleGetListSdFile();
            },
            error: () => {
              showError('error');
            },
          });
      })
      .catch(() => {});
  }, [handleGetListSdFile, handleOffUploadLoading, handleOnUploadLoading]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetListSdFile();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetListSdFile, navigation]);

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Printing')}
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
            <Text style={[atomicStyles.textDark]}>
              {translate('From SD Card')}
            </Text>

            <Text style={[atomicStyles.textDark]}>{progress}</Text>

            {uploadLoading && (
              <ActivityIndicator color={Colors.Primary} size={'small'} />
            )}
          </View>

          <FlatList
            renderItem={({item, index}: ListRenderItemInfo<string>) => {
              return (
                <PrintingFile
                  key={index}
                  title={item}
                  onDelete={() => handleDeleteFileFromSd(item!)}
                  onPrint={() => handlePrintFileFromSd(item)}
                />
              );
            }}
            data={listFile}
            style={styles.flatList}
            keyExtractor={(_item, index) => index.toString()}
            refreshing={getListLoading}
            onRefresh={handleGetListSdFile}
          />
        </View>
      </DefaultLayout>
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
