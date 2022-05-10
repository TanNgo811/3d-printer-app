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

          setListFile(convertArray! ?? listFile);
        },
        error: () => {
          showError(translate('error.error'));
        },
      });
  }, [handleOffGetListLoading, handleOnGetListLoading, listFile, translate]);

  const handleDeleteFileFromSd = React.useCallback(
    (fileName: string) => {
      commandRepository
        .sendCommandText(`${GCode.DeleteSDFile} ${fileName}\n`)
        .subscribe({
          next: () => {
            handleGetListFileFromSdCard();
          },
          error: () => {
            showError(translate('error.error'));
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
          showSuccess('success.beginPrintingSuccessful');
          navigation.navigate(PrintProgressScreen.displayName, {
            fileName: currentFile,
          });
        },
        error: () => {
          showError(translate('error.beginPrintingFailed'));
        },
      });
  }, [currentFile, navigation, translate]);

  const handleGetFileInStorage = React.useCallback(() => {
    DocumentPicker.pickSingle({
      allowMultiSelection: false,
    })
      .then((result: DocumentPickerResponse) => {
        handleOnUploadLoading();
        uploadRepository
          .uploadFile(result, event => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
          .pipe(finalize(() => handleOffUploadLoading()))
          .subscribe({
            next: () => {
              setProgress(100);
              handleGetListFileFromSdCard();
            },
            error: () => {
              showError(translate('error.error'));
            },
          });
      })
      .catch(() => {});
  }, [
    handleGetListFileFromSdCard,
    handleOffUploadLoading,
    handleOnUploadLoading,
    translate,
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
