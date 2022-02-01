import React, {ßFC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './EditInformationScreen.scss';

/**
 * File: EditInformationScreen.tsx
 * @created 2022-02-02 01:10:59
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<EditInformationScreenProps>>}
 */
const EditInformationScreen: FC<
  PropsWithChildren<EditInformationScreenProps>
> = (props: PropsWithChildren<EditInformationScreenProps>): ReactElement => {
  return <>{props.children}</>;
};

export interface EditInformationScreenProps {
  //
}

EditInformationScreen.defaultProps = {
  //
};

EditInformationScreen.propTypes = {
  //
};

EditInformationScreen.displayName = nameof(EditInformationScreen);

export default EditInformationScreen;
