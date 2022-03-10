import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {GCode} from 'src/config/g-code';
import {useNavigation} from '@react-navigation/native';
import {showInfo} from 'src/helpers/toasty';

export function useNetworkService(): [
  () => void,
  any[],
  any[],
  () => void,
  (P: number, T: number | string, V: string | number) => void,
] {
  const [networkConfiguration, setNetworkConfiguration] = React.useState<any>(
    {},
  );

  const [listSSID, setListSSID] = React.useState<any[]>([]);

  const navigation = useNavigation();

  const handleSubmitNetworkConfig = React.useCallback(
    (P: number, T: number | string, V: string | number) => {
      commandRepository
        .sendCommandPlain(
          `${GCode.SubmitNetworkConfiguration}P=${P} T=${T} V=${V}`,
        )
        .subscribe({
          next: (result: string) => {
            showInfo(result);
          },
          error: () => {},
        });
    },
    [],
  );

  const handleGetNetworkConfiguration = React.useCallback(() => {
    commandRepository
      .sendCommandPlain(GCode.GetNetworkConfiguration)
      .subscribe({
        next: result => {
          setNetworkConfiguration(result);
        },
        error: () => {},
      });
  }, []);

  const handleGetStationSSID = React.useCallback(() => {
    commandRepository.sendCommandPlain(GCode.GetApList).subscribe({
      next: result => {
        const sort: any[] = result.AP_LIST.sort(
          (a: any, b: any) => parseInt(b.SIGNAL) - parseInt(a.SIGNAL),
        );

        setListSSID(sort);
      },
      error: () => {},
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetNetworkConfiguration();

      handleGetStationSSID();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetNetworkConfiguration, handleGetStationSSID, navigation]);

  return [
    handleGetNetworkConfiguration,
    networkConfiguration.EEPROM,
    listSSID,
    handleGetStationSSID,
    handleSubmitNetworkConfig,
  ];
}
