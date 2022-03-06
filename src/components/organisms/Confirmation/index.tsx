import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './Confirmation.scss';
import nameof from 'ts-nameof.macro';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import {Button} from '../../atoms/Button';

export function Confirmation(
  props: PropsWithChildren<ConfirmationProps>,
): ReactElement {
  const {
    isVisible,
    onBackdropPress,
    title,
    subtitle,
    labelSecondary,
    labelPrimary,
    onPressSecondary,
    onPressPrimary,
  } = props;

  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="fadeInUp"
      animationOut="fadeOutUp">
      <View style={styles.modal}>
        <Text
          style={[
            styles.textModal,
            atomicStyles.textPrimary,
            atomicStyles.bold,
            ANDROID && atomicStyles.androidBold,
          ]}>
          {title}
        </Text>

        <Text style={[atomicStyles.textDark]}>{subtitle}</Text>

        <View style={styles.confirmButtonContainer}>
          <Button
            title={labelSecondary}
            onPress={onPressSecondary}
            buttonContainerStyle={[styles.button, atomicStyles.mr8]}
          />

          <Button
            title={labelPrimary}
            isOutlined={false}
            onPress={onPressPrimary}
            buttonContainerStyle={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

export interface ConfirmationProps {
  //
  isVisible?: boolean;

  onBackdropPress?: () => void;

  title?: string;

  subtitle?: string;

  labelSecondary?: string;

  labelPrimary?: string;

  onPressSecondary?: () => void;

  onPressPrimary?: () => void;
}

Confirmation.defaultProps = {
  //
};

Confirmation.displayName = nameof(Confirmation);

export default Confirmation;
