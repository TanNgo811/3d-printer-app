import React from 'react';
import type {Subscription} from 'rxjs';
import {commandRepository} from 'src/repositories/command-repository';
import {showError, showSuccess} from 'src/helpers/toasty';
import type {PrinterPosition} from 'src/types/PrinterPosition';

export function useMoveCommandService(): [
  (position: PrinterPosition) => void,
  () => void,
  () => void,
  () => void,
  () => void,
] {
  const handleControlMove = React.useCallback((command?: string) => {
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

  const handleMoveCustom = React.useCallback(
    (position: PrinterPosition) => {
      handleControlMove(
        `G91\nG1 ${
          (position?.X && `X${position?.X}`) ||
          (position?.Y && `Y${position?.Y}`) ||
          (position?.Z && `Z${position?.Z}`)
        } F1000\nG90`,
      );
    },
    [handleControlMove],
  );

  const handleGoToAutoHome = React.useCallback(() => {
    handleControlMove('G28');
  }, [handleControlMove]);

  const handleGoToXHome = React.useCallback(() => {
    handleControlMove('G28 X0');
  }, [handleControlMove]);

  const handleGoToYHome = React.useCallback(() => {
    handleControlMove('G28 Y0');
  }, [handleControlMove]);

  const handleGoToZHome = React.useCallback(() => {
    handleControlMove('G28 Z0');
  }, [handleControlMove]);

  return [
    handleMoveCustom,
    handleGoToAutoHome,
    handleGoToXHome,
    handleGoToYHome,
    handleGoToZHome,
  ];
}
