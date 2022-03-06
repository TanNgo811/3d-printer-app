import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {useTranslation} from 'react-i18next';
import {showError, showSuccess} from 'src/helpers/toasty';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';
import {GCode} from 'src/config/g-code';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {uploadRepository} from 'src/repositories/upload-repository';
import type {StackScreenProps} from '@react-navigation/stack';
import {PrintProgressScreen} from 'src/screens/Root';

export function useListSdFileService(
  navigation: StackScreenProps<any>['navigation'],
): [
  string[],
  () => void,
  boolean,
  (fileName: string) => void,
  () => void,
  () => void, //handleGetFileFromStorage
  number, //uploadProgress
  boolean, // uploadLoading
  string, //currentFile,
  (fileName: string) => void, //handleSelectFile
] {
  const [listFile, setListFile] = React.useState<string[]>();

  const [getListLoading, , handleOnGetListLoading, handleOffGetListLoading] =
    useBoolean(false);

  const [progress, setProgress] = React.useState<number>(0);

  const [uploadLoading, , handleOnUploadLoading, handleOffUploadLoading] =
    useBoolean(false);

  const [currentFile, setCurrentFile] = React.useState<string>('');

  const [translate] = useTranslation();

  const handleGetListFileFromSdCard = React.useCallback(() => {
    handleOnGetListLoading();

    commandRepository
      .sendCommandText(GCode.ListSDFile)
      .pipe(
        finalize(() => {
          handleOffGetListLoading();
        }),
      )
      .subscribe({
        next: (result: string) => {
          const convertArray = result?.match(/(.+).GCO/gm);

          setListFile(convertArray!);
        },
        error: () => {
          showError(translate('error'));
        },
      });
  }, [handleOffGetListLoading, handleOnGetListLoading, translate]);

  const handleDeleteFileFromSd = React.useCallback(
    (fileName: string) => {
      commandRepository
        .sendCommandText(`${GCode.DeleteSDFile} ${fileName}\n`)
        .subscribe({
          next: () => {
            handleGetListFileFromSdCard();
          },
          error: () => {
            showError(translate('error'));
          },
        });
    },
    [handleGetListFileFromSdCard, translate],
  );

  const handlePrintFileFromSd = React.useCallback(() => {
    commandRepository
      .sendCommandText(
        `${GCode.SelectSDFile} ${currentFile}\n ${GCode.StartSDPrint}`,
      )
      .subscribe({
        next: () => {
          showSuccess('begin printing successful...');
          navigation.navigate(PrintProgressScreen.displayName, {
            fileName: currentFile,
          });
        },
        error: () => {
          showError(translate('begin printing failed...'));
        },
      });
  }, [currentFile, navigation, translate]);

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
            console.log(event);
          })
          .pipe(finalize(() => handleOffUploadLoading()))
          .subscribe({
            next: end => {
              console.log('uploadFileDone', end);
              setProgress(100);
              handleGetListFileFromSdCard();
            },
            error: () => {
              showError('error');
            },
          });
      })
      .catch(() => {});
  }, [
    handleGetListFileFromSdCard,
    handleOffUploadLoading,
    handleOnUploadLoading,
  ]);

  const handleSelectFile = React.useCallback((file: string) => {
    setCurrentFile(file);
  }, []);

  return [
    listFile!,
    handleGetListFileFromSdCard,
    getListLoading,
    handleDeleteFileFromSd,
    handlePrintFileFromSd,
    handleGetFileInStorage,
    progress,
    uploadLoading,
    currentFile,
    handleSelectFile,
  ];
}
