import {commandRepository} from 'src/repositories/command-repository';
import React from 'react';
import {showError, showSuccess} from 'src/helpers/toasty';

export function useFanCommandService(): [
  number,
  (speed?: number) => void,
  () => void,
] {
  const [fanSpeed, setFanSpeed] = React.useState<number>(0);

  const handleTurnOffFan = React.useCallback(() => {
    commandRepository.sendCommandText('M107').subscribe({
      next: () => {
        showSuccess('success');
      },
      error: () => {
        showError('error');
      },
    });
  }, []);

  const handleSendFanSpeedCommand = React.useCallback(
    (speed?: number) => {
      if (speed === 0) {
        handleTurnOffFan();
      } else {
        commandRepository
          .sendCommandText(`M106 S${Math.round(speed!)}`)
          .subscribe({
            next: () => {
              showSuccess('success');
              setFanSpeed((speed ?? 255 * 100) / 255);
            },
            error: () => {
              showError('error');
            },
          });
      }
    },
    [handleTurnOffFan],
  );

  return [fanSpeed, handleSendFanSpeedCommand, handleTurnOffFan];
}
