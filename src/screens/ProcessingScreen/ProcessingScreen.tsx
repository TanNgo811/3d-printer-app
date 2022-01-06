import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import './ProcessingScreen.scss';

/**
 * File: ProcessingScreen.tsx
 * @created 2022-01-06 00:24:14
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ProcessingScreenProps>>}
 */
const ProcessingScreen: FC<PropsWithChildren<ProcessingScreenProps>> = (
  props: PropsWithChildren<ProcessingScreenProps>,
): ReactElement => {
  return (
    <>
      {props.children}
    </>
  );
};

export interface ProcessingScreenProps {
  //
}

ProcessingScreen.defaultProps = {
  //
};

ProcessingScreen.propTypes = {
  //
};

ProcessingScreen.displayName = nameof(ProcessingScreen);

export default ProcessingScreen;
