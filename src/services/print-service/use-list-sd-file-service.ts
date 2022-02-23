import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {useTranslation} from 'react-i18next';
import {showError, showSuccess} from 'src/helpers/toasty';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';

export function useListSdFileService(): [
  string[],
  () => void,
  boolean,
  (fileName: string) => void,
  (fileName: string) => void,
] {
  const [listFile, setListFile] = React.useState<string[]>();

  const [getListLoading, , handleOnGetListLoading, handleOffGetListLoading] =
    useBoolean(false);

  const [translate] = useTranslation();

  const handleGetListFileFromSdCard = React.useCallback(() => {
    handleOnGetListLoading();

    commandRepository
      .sendCommandText('M20')
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
      commandRepository.sendCommandText(`M30 ${fileName}\n`).subscribe({
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

  const handlePrintFileFromSd = React.useCallback(
    (fileName: string) => {
      commandRepository.sendCommandText(`M23 ${fileName}\n M24`).subscribe({
        next: (result: string) => {
          showSuccess('printing');
        },
        error: () => {
          showError(translate('error'));
        },
      });
    },
    [translate],
  );

  const handleUpdateProcessPrinting = React.useCallback(() => {
    commandRepository.sendCommandText('M27').subscribe({
      next: (result: string) => {},
      error: () => {
        showError(translate('error'));
      },
    });
  }, [translate]);

  const handleAbortProcessPrinting = React.useCallback(() => {
    commandRepository.sendCommandText('M524').subscribe({
      next: (result: string) => {},
      error: () => {
        showError(translate('error'));
      },
    });
  }, [translate]);

  return [
    listFile!,
    handleGetListFileFromSdCard,
    getListLoading,
    handleDeleteFileFromSd,
    handlePrintFileFromSd,
  ];
}
