import {commandRepository} from 'src/repositories/command-repository';
import React from 'react';
import {showError, showSuccess} from 'src/helpers/toasty';
import {useTranslation} from 'react-i18next';

export function useFanCommandService(): [
  number,
  (speed?: number) => void,
  () => void,
] {
  const [fanSpeed, setFanSpeed] = React.useState<number>(0);

  const [translate] = useTranslation();

  const handleTurnOffFan = React.useCallback(() => {
    commandRepository.sendCommandText('M107').subscribe({
      next: () => {
        showSuccess(translate('success.success'));
      },
      error: () => {
        showError(translate('error.error'));
      },
    });
  }, [translate]);

  const handleSendFanSpeedCommand = React.useCallback(
    (speed?: number) => {
      if (speed === 0) {
        handleTurnOffFan();
      } else {
        commandRepository
          .sendCommandText(`M106 S${Math.round(speed!)}`)
          .subscribe({
            next: () => {
              showSuccess(translate('success.success'));
              setFanSpeed((speed ?? 255 * 100) / 255);
            },
            error: () => {
              showError(translate('error.error'));
            },
          });
      }
    },
    [handleTurnOffFan, translate],
  );

  return [fanSpeed, handleSendFanSpeedCommand, handleTurnOffFan];
}
