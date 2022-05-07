import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError} from 'src/helpers/toasty';
import {AppState, AppStateStatus} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNFetchBlob from 'react-native-fetch-blob';
import type {Moment} from 'moment/moment';
import moment from 'moment';

export interface TemperatureValue {
  temp: number;

  time: Moment;
}

export function useTemperatureChartService(): [
  TemperatureValue[],
  (state: AppStateStatus) => void,
  TemperatureValue,
  boolean,
  (status: boolean) => void,
  () => void,
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

        setLatestTemp({
          temp: parseFloat(modifyResult[0]),
          time: moment(Date.now()),
        });

        setTempArray([
          ...tempArray,
          {temp: parseFloat(modifyResult[0]), time: moment(Date.now())},
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

  const handleConvertToCsv = React.useCallback(() => {
    //

    const values = tempArray.map((temp: TemperatureValue) => [
      temp.temp.toString(),
      temp.time.toDate(),
    ]);

    // construct csvString
    const headerString = 'temperature,timestamp\n';
    const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(_error => {
        //
      });
  }, [tempArray]);

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
    handleConvertToCsv,
  ];
}
