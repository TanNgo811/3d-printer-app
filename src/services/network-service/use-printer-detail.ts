import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {GCode} from 'src/config/g-code';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';
import {useNavigation} from '@react-navigation/native';

export interface PrinterDetail {
  id?: number;

  name?: string;

  value?: string;
}

export function usePrinterDetail(): [
  string,
  boolean,
  PrinterDetail[],
  () => void,
] {
  const [infoDetail, setInfoDetail] = React.useState<string>('');

  const [detailList, setDetailList] = React.useState<PrinterDetail[]>([]);

  const navigation = useNavigation();

  const [loading, , handleOnLoading, handleOffLoading] = useBoolean(false);

  const handleGetInfoDetail = React.useCallback(() => {
    handleOnLoading();

    commandRepository
      .sendCommandPlain(GCode.GetPrinterInfo)
      .pipe(
        finalize(() => {
          handleOffLoading();
        }),
      )
      .subscribe({
        next: (result: string) => {
          setInfoDetail(result);

          setDetailList(
            result.split('\n').map((item, index) => ({
              id: index,
              name: item.split(':')[0] ?? '',
              value: item.split(':')[1] ?? '',
            })),
          );
        },
        error: () => {},
      });
  }, [handleOffLoading, handleOnLoading]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //
      handleGetInfoDetail();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetInfoDetail, navigation]);

  return [infoDetail, loading, detailList, handleGetInfoDetail];
}
