import React from 'react';
import styles from './LoadingComponent.scss';
import LottieView from 'lottie-react-native';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {atomicStyles} from 'src/styles';

export function LoadingComponent(
  props: PropsWithChildren<LoadingComponentProps>,
): ReactElement {
  const {loading} = props;

  return (
    <>
      <Modal
        isVisible={loading}
        style={[
          atomicStyles.justifyContentCenter,
          atomicStyles.alignItemsCenter,
        ]}>
        <View style={styles.modalContainer}>
          <LottieView
            source={require('assets/animation/27334-lightbulb.json')}
            speed={2}
            // autoSize={true}
            autoPlay={true}
          />
        </View>
      </Modal>
    </>
  );
}

export interface LoadingComponentProps {
  //
  loading?: boolean;
}

LoadingComponent.defaultProps = {
  //
};

LoadingComponent.displayName = nameof(LoadingComponent);

export default LoadingComponent;
