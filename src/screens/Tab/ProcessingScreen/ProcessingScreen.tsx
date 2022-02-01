import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ProcessingScreen.scss';
import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';

/**
 * File: ProcessingScreen.tsx
 * @created 2022-01-06 00:24:14
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ProcessingScreenProps>>}
 */
const ProcessingScreen: FC<PropsWithChildren<ProcessingScreenProps>> = (
  props: PropsWithChildren<ProcessingScreenProps>,
): ReactElement => {
  const {} = props;

  const [translate] = useTranslation();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Quá trình')}
        isLeftIcon={false}
        contentScrollable={true}>
        <View style={styles.container}>
          <Text style={[atomicStyles.text, atomicStyles.textDark]}>Abc</Text>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface ProcessingScreenProps extends StackScreenProps<any> {
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
