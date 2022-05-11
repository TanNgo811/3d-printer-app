import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError, showSuccess} from 'src/helpers/toasty';
import {AppState, AppStateStatus} from 'react-native';
import {useTranslation} from 'react-i18next';

export function useExtruderCommandService(): [
  number,
  () => void,
  (state: AppStateStatus) => void,
  (temperature?: number) => void,
] {
  const [currentTemp, setCurrentTemp] = React.useState<number>(0);

  const [translate] = useTranslation();

  const handleGetCurrentTemp = React.useCallback(() => {
    commandRepository.sendCommandText('M105').subscribe({
      next: (result: string) => {
        const modifyResult: string[] = result
          .replace('ok T:', '')
          .replace(' @:0', '')
          .split(' /');

        setCurrentTemp(parseFloat(modifyResult[0]));
      },
      error: () => {
        showError(translate('error.canNotGetTemperature'));
      },
    });
  }, [translate]);

  const handleUpdateCurrentTemp = React.useCallback(
    (state: AppStateStatus) => {
      //@ts-ignore
      let timeout: NodeJS.Timeout;

      switch (state) {
        case 'active':
          timeout = setInterval(() => {
            handleGetCurrentTemp();
          }, 3000);
          break;

        case 'inactive':
          if (timeout) {
            clearInterval(timeout);
          }

          AppState.removeEventListener('change', handleUpdateCurrentTemp);
          break;
      }
    },
    [handleGetCurrentTemp],
  );

  const handleSendTemperatureCommand = React.useCallback(
    (temperature?: number) => {
      commandRepository
        .sendCommandText(`M104 S${Math.round(temperature!)} T0`)
        .subscribe({
          next: () => {
            showSuccess(translate('success.success'));
            handleGetCurrentTemp();
          },
          error: () => {
            showError(translate('error.error'));
          },
        });
    },
    [handleGetCurrentTemp, translate],
  );

  return [
    currentTemp,
    handleGetCurrentTemp,
    handleUpdateCurrentTemp,
    handleSendTemperatureCommand,
  ];
}
