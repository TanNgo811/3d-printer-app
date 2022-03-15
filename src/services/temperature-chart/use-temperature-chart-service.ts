import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError} from 'src/helpers/toasty';
import {AppState, AppStateStatus} from 'react-native';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';

export interface TemperatureValue {
  temp: number;

  time: number;
}

export function useTemperatureChartService(
  navigation: StackScreenProps<any>['navigation'],
  refreshTime?: number,
): [
  TemperatureValue[],
  (state: AppStateStatus) => void,
  TemperatureValue,
  boolean,
  (status: boolean) => void,
] {
  const [tempArray, setTempArray] = React.useState<TemperatureValue[]>([]);

  const [latestTemp, setLatestTemp] = React.useState<TemperatureValue>();

  const [enableTracking, setEnableTracking] = React.useState<boolean>(false);

  const handleSetStatusEnableTracking = React.useCallback((status: boolean) => {
    setEnableTracking(status);
  }, []);

  const [translate] = useTranslation();

  const handleGetCurrentTemp = React.useCallback(() => {
    commandRepository.sendCommandText('M105').subscribe({
      next: (result: string) => {
        const modifyResult: string[] = result
          .replace('ok T:', '')
          .replace(' @:0', '')
          .split(' /');

        setLatestTemp({temp: parseFloat(modifyResult[0]), time: Date.now()});

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

  React.useEffect(() => {
    if (enableTracking) {
      const interval = setInterval(() => {
        handleGetCurrentTemp();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [enableTracking, handleGetCurrentTemp]);

  return [
    tempArray,
    handleUpdateCurrentTemp,
    latestTemp!,
    enableTracking,
    handleSetStatusEnableTracking,
  ];
}
