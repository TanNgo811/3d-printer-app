import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError, showInfo, showSuccess} from 'src/helpers/toasty';
import {GCode} from 'src/config/g-code';
import {useBoolean} from 'react3l-common';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';

export function useProgressServices(
  navigation?: StackScreenProps<any>['navigation'],
  needRefresh?: boolean,
  refreshTime?: number,
): [
  number,
  () => void,
  () => void,
  () => void,
  () => void,
  () => void,
  boolean,
  (fileName: string) => void,
  boolean,
] {
  const [translate] = useTranslation();

  const [progress, setProgress] = React.useState<number>(0);

  const [isPrinting, , handleOnPrinting, handleOffPrinting] = useBoolean(true);

  const [isAvailable, , handleOnAvailable, handleOffAvailable] =
    useBoolean(false);

  const handleGetProgress = React.useCallback(() => {
    commandRepository.sendCommandText(GCode.ReportSDPrintStatus).subscribe({
      next: (result: string) => {
        if (result.match(/Not/g)) {
          handleOnAvailable();

          setProgress(0);
        } else {
          handleOffAvailable();

          const editedResult = result.match(/\d+/g);

          if (editedResult?.length === 2) {
            setProgress(
              parseInt(editedResult![0]) / parseInt(editedResult![1]),
            );
          }
        }
      },
      error: () => {
        showError('get print progress failed!');
      },
    });
  }, [handleOffAvailable, handleOnAvailable]);

  const handleAbortProgress = React.useCallback(() => {
    commandRepository.sendCommandText(GCode.AbortSDPrint).subscribe({
      next: (result: string) => {
        //
        showInfo(result);
        handleOffPrinting();
      },
      error: () => {
        showError('handle abort progress failed!');
      },
    });
  }, [handleOffPrinting]);

  const handlePauseProgress = React.useCallback(() => {
    commandRepository.sendCommandText(GCode.PauseSDPrint).subscribe({
      next: (result: string) => {
        //
        showInfo(result);
        handleOffPrinting();
      },
      error: () => {
        showError('handle pause progress failed!');
      },
    });
  }, [handleOffPrinting]);

  const handleStartProgress = React.useCallback(() => {
    commandRepository.sendCommandText(GCode.StartSDPrint).subscribe({
      next: (result: string) => {
        //
        showInfo(result);
        handleOnPrinting();
      },
      error: () => {
        showError('handle start progress failed!');
      },
    });
  }, [handleOnPrinting]);

  const handleMoveToHomePosition = React.useCallback(() => {
    commandRepository.sendCommandText(GCode.AutoHome).subscribe({
      next: (result: string) => {
        //
        showInfo(result);
      },
      error: () => {
        showError('handle move to home position failed!');
      },
    });
  }, []);

  const handlePrintFileFromSd = React.useCallback(
    (fileName: string) => {
      commandRepository
        .sendCommandText(
          `${GCode.SelectSDFile} ${fileName}\n ${GCode.StartSDPrint}`,
        )
        .subscribe({
          next: () => {
            setProgress(0);

            showSuccess('progress.resetPrintSuccess');
          },
          error: () => {
            showError(translate('error.error'));
          },
        });
    },
    [translate],
  );

  React.useEffect(() => {
    //

    let intervalJob: number;

    if (needRefresh) {
      intervalJob = setInterval(() => {
        handleGetProgress();
      }, refreshTime ?? 3000);
    } else {
      //
    }

    const unsubscribe = navigation!.addListener('blur', () => {
      clearInterval(intervalJob);
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetProgress, navigation, needRefresh, refreshTime]);

  return [
    progress,
    handleGetProgress,
    handleStartProgress,
    handlePauseProgress,
    handleAbortProgress,
    handleMoveToHomePosition,
    isPrinting,
    handlePrintFileFromSd,
    isAvailable,
  ];
}
