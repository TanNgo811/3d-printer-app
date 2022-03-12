import {useBoolean} from 'react3l-common';
import React from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {GCode} from 'src/config/g-code';
import {finalize} from 'rxjs';
import {showInfo} from 'src/helpers/toasty';

export function usePrinterRestart(): [boolean, () => void] {
  const [loading, , handleOnLoading, handleOffLoading] = useBoolean(false);

  const handleRestartPrinter = React.useCallback(() => {
    handleOnLoading();

    commandRepository
      .sendCommandText(GCode.RestartPrinter)
      .pipe(
        finalize(() => {
          handleOffLoading();
        }),
      )
      .subscribe({
        next: (result: string) => {
          //
          showInfo(
            result + '\n Vui lòng chờ trong 30s để quá trình hoàn thành...',
          );
        },
        error: () => {},
      });
  }, [handleOffLoading, handleOnLoading]);

  return [loading, handleRestartPrinter];
}
