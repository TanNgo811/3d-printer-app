import React, {Reducer} from 'react';
import {commandRepository} from 'src/repositories/command-repository';
import {showError, showInfo} from 'src/helpers/toasty';
import {useTranslation} from 'react-i18next';
import {MAXIMUM_PLA} from 'src/config/const';

export interface ExtruderFilamentState {
  length: number;

  extruderRate: number;
}

export interface ExtruderFilamentAction {
  type: ExtruderFilamentActionType;

  length?: number;

  extruderRate?: number;
}

export enum ExtruderFilamentActionType {
  CHANGE_LENGTH,

  CHANGE_RATE,
}

export function extruderFilamentReducer(
  state: ExtruderFilamentState,
  action: ExtruderFilamentAction,
): ExtruderFilamentState {
  switch (action.type) {
    case ExtruderFilamentActionType.CHANGE_LENGTH:
      return {...state, length: action.length!};

    case ExtruderFilamentActionType.CHANGE_RATE:
      return {...state, length: action.length!};

    default:
      return {...state};
  }
}

// commandText=T0%0AG91%0AG1%20E10%20F100%0AG90&PAGEID=0

// commandText: T0
// G91
// G1 E10 F100
// G90

export function useExtruderFilament(): [
  ExtruderFilamentState,
  (value: number) => void,
  (value: number) => void,
  (isForward: boolean) => void,
] {
  //

  const [extruderFilament, dispatch] = React.useReducer<
    Reducer<ExtruderFilamentState, ExtruderFilamentAction>
  >(extruderFilamentReducer, {
    length: 10,

    extruderRate: 100,
  });

  const [translate] = useTranslation();

  const handleChangeLength = React.useCallback((value: number) => {
    dispatch({
      type: ExtruderFilamentActionType.CHANGE_LENGTH,
      length: value,
    });
  }, []);

  const handleChangeExtruderRate = React.useCallback((value: number) => {
    dispatch({
      type: ExtruderFilamentActionType.CHANGE_RATE,
      extruderRate: value,
    });
  }, []);

  const handleSendCommandExtruderFilament = React.useCallback(
    (isForward: boolean) => {
      const length = isForward
        ? extruderFilament.length
        : extruderFilament.length * -1;

      commandRepository.sendCommandText('M105').subscribe({
        next: (result: string) => {
          const modifyResult: string[] = result
            .replace('ok T:', '')
            .replace(' @:0', '')
            .split(' /');

          const temperature = parseFloat(modifyResult[0]);

          if (temperature >= MAXIMUM_PLA) {
            commandRepository
              .sendCommandText(
                `T0\nG91\nG1 E${length} F${extruderFilament.extruderRate}\nG90`,
              )
              .subscribe({
                next: () => {},
                error: () => {
                  showError(translate('error.error'));
                },
              });
          } else {
            showInfo(translate('error.extruderNotHot'));
          }
        },
        error: () => {
          showError(translate('error.canNotGetTemperature'));
        },
      });
    },
    [extruderFilament.extruderRate, extruderFilament.length, translate],
  );

  return [
    extruderFilament,
    handleChangeLength,
    handleChangeExtruderRate,
    handleSendCommandExtruderFilament,
  ];
}
