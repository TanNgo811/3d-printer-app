import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError} from 'src/helpers/toasty';
import {AppState, AppStateStatus} from 'react-native';
import {useTranslation} from 'react-i18next';

export interface TemperatureValue {
  temp: number;

  time: number;
}

export function useTemperatureChartService(
  timeRefresh?: number,
): [TemperatureValue[], (state: AppStateStatus) => void] {
  const [tempArray, setTempArray] = React.useState<TemperatureValue[]>([]);

  const [translate] = useTranslation();

  const handleGetCurrentTemp = React.useCallback(() => {
    commandRepository.sendCommandText('M105').subscribe({
      next: (result: string) => {
        const modifyResult: string[] = result
          .replace('ok T:', '')
          .replace(' @:0', '')
          .split(' /');

        setTempArray([
          ...tempArray,
          {temp: parseFloat(modifyResult[0]), time: Date.now()},
        ]);
      },
      error: () => {
        showError(translate('Cant get temperature'));
      },
    });
  }, [tempArray, translate]);

  const handleUpdateCurrentTemp = React.useCallback(
    (state: AppStateStatus) => {
      //@ts-ignore
      let timeout: NodeJS.Timeout;

      switch (state) {
        case 'active':
          timeout = setInterval(() => {
            handleGetCurrentTemp();
          }, 10000);
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

  React.useEffect(() => {
    setTimeout(() => {
      handleGetCurrentTemp();
    }, 3000);
  }, [handleGetCurrentTemp]);

  return [tempArray, handleUpdateCurrentTemp];
}
