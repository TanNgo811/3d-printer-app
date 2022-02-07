import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import {View, Text, Button} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles} from 'src/styles';
import {showError, showSuccess} from 'src/helpers/toasty';
import type {Subscription} from 'rxjs';
import {commandRepository} from 'src/repositories/command-repository';

/**
 * File: HomeScreen.tsx
 * @created 2022-01-06 00:24:02
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<HomeScreenProps>>}
 */
const HomeScreen: FC<PropsWithChildren<HomeScreenProps>> = (
  props: PropsWithChildren<HomeScreenProps>,
): ReactElement => {
  const {} = props;

  const [translate] = useTranslation();

  // console.log(
  //   decodeURI(
  //     'http://192.168.31.63/command?commandText=G91%0AG1%20X100%20F1000%0AG90&PAGEID=0',
  //   ),
  // );

  const handleTestFunction = React.useCallback(() => {
    const subscription: Subscription = commandRepository
      .sendCommandText('G91\nG1 X100 F1000\nG90')
      .subscribe({
        next: () => {
          showSuccess('success');
        },
        error: () => {
          showError('error');
        },
      });

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Điều khiển')}
        isLeftIcon={false}
        contentScrollable={true}>
        <View style={styles.container}>
          <Text style={[atomicStyles.text, atomicStyles.textDark]}>Abc</Text>

          <Button
            title={'Move 10cm'}
            onPress={() => {
              handleTestFunction();
            }}
          />
        </View>
      </DefaultLayout>
    </>
  );
};

export interface HomeScreenProps extends StackScreenProps<any> {
  //
}

HomeScreen.defaultProps = {
  //
};

HomeScreen.propTypes = {
  //
};

HomeScreen.displayName = nameof(HomeScreen);

export default HomeScreen;
