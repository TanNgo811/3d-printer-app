import React from 'react';
import type {TerminalCommand} from 'src/types/TerminalCommand';
import {commandRepository} from 'src/repositories/command-repository';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';
import {showError} from 'src/helpers/toasty';

export function useTerminalService(): [
  TerminalCommand[],
  () => void,
  boolean,
  (value: string) => void,
  string,
] {
  const [listCommand, setListCommand] = React.useState<TerminalCommand[]>([]);

  const [command, setCommand] = React.useState<string>('');

  const [execLoading, , handleOnLoading, handleOffLoading] = useBoolean(false);

  const handleChangeTextCommand = React.useCallback((text: string) => {
    setCommand(text);
  }, []);

  const handleExecuteCommand = React.useCallback(async () => {
    // await setListCommand([
    //   ...listCommand,
    //   {content: command, time: Date.now()},
    // ]);

    handleOnLoading();

    await commandRepository
      .sendCommandText(command)
      .pipe(
        finalize(() => {
          handleOffLoading();
        }),
      )
      .subscribe({
        next: async (result: string) => {
          await setListCommand([
            ...listCommand,
            {content: command, time: Date.now()},
            {content: result, time: Date.now()},
          ]);

          await setCommand('');
        },
        error: error => {
          showError(error);
        },
      });
  }, [command, handleOffLoading, handleOnLoading, listCommand]);

  return [
    listCommand,
    handleExecuteCommand,
    execLoading,
    handleChangeTextCommand,
    command,
  ];
}
