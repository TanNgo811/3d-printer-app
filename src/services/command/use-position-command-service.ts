import React from 'react';
import type {PrinterPosition} from 'src/types/PrinterPosition';
import type {Subscription} from 'rxjs';
import {commandRepository} from 'src/repositories/command-repository';
import {showError, showSuccess, showWarning} from 'src/helpers/toasty';
import type {AppStateStatus} from 'react-native';
import {AppState} from 'react-native';

export function usePositionCommandService(): [
  PrinterPosition,
  () => void,
  (state: AppStateStatus) => void,
  () => void,
  () => void,
] {
  const [position, setPosition] = React.useState<PrinterPosition>({
    X: 0,
    Y: 0,
    Z: 0,
  });

  const handleGetCurrentPosition = React.useCallback(() => {
    commandRepository.sendCommandText('M114').subscribe({
      next: (result: string) => {
        if (result.match('busy')) {
          showWarning('busy command M114');
        } else {
          const positionArray = result.match(/([0-9]+(\.|)([0-9]+|))/g);

          setPosition({
            X: parseFloat(positionArray![0]),
            Y: parseFloat(positionArray![1]),
            Z: parseFloat(positionArray![2]),
            Extruder: parseFloat(positionArray![3]),
          });
        }
      },
      error: () => {
        showError('current position error');
      },
    });
  }, []);

  const handleUpdateCurrentPosition = React.useCallback(
    (state: AppStateStatus) => {
      //@ts-ignore
      let timeout: NodeJS.Timeout;

      switch (state) {
        case 'active':
          timeout = setInterval(() => {
            handleGetCurrentPosition();
          }, 3000);
          break;

        case 'inactive':
          if (timeout) {
            clearInterval(timeout);
          }

          AppState.removeEventListener('change', handleUpdateCurrentPosition);
          break;
      }
    },
    [handleGetCurrentPosition],
  );

  const handlePositionCommand = React.useCallback((command: string) => {
    const subscription: Subscription = commandRepository
      .sendCommandText(command)
      .subscribe({
        next: () => {
          showSuccess('success');
        },
        error: () => {
          showError('error');
        },
      });

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  const handleGetAbsolutePosition = React.useCallback(() => {
    handlePositionCommand('G90');
  }, [handlePositionCommand]);

  const handleGetRelativePosition = React.useCallback(() => {
    handlePositionCommand('G91');
  }, [handlePositionCommand]);

  return [
    position,
    handleGetCurrentPosition,
    handleUpdateCurrentPosition,
    handleGetAbsolutePosition,
    handleGetRelativePosition,
  ];
}
