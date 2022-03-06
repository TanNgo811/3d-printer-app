import React from 'react';
import styles from './UploadLoadingComponent.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {Image, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {atomicStyles} from 'src/styles';
import {ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH} from 'src/config/const';
import {useTranslation} from 'react-i18next';

export function UploadLoadingComponent(
  props: PropsWithChildren<UploadLoadingComponentProps>,
): ReactElement {
  const {isVisible} = props;

  const [translate] = useTranslation();

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutUp">
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('assets/gif/patience-gif.gif')}
              style={[
                styles.image,
                {width: SCREEN_WIDTH - 100, height: SCREEN_HEIGHT * 0.2},
              ]}
            />
          </View>

          <Text
            style={[
              atomicStyles.textPrimary,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
              styles.title,
            ]}>
            {translate('Uploading file...')}
          </Text>

          <View style={[atomicStyles.mt4]}>
            <Text
              style={[
                atomicStyles.textSecondary,
                atomicStyles.text,
                atomicStyles.textCenter,
              ]}>
              {translate(
                '“Patience is not the ability to wait, but the ability to keep a good attitude while waiting.”',
              )}
            </Text>

            <Text
              style={[
                atomicStyles.textSecondary,
                atomicStyles.text,
                atomicStyles.textCenter,
              ]}>
              {translate('_The Unknown_')}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

export interface UploadLoadingComponentProps {
  //
  isVisible?: boolean;
}

UploadLoadingComponent.defaultProps = {
  //
};

UploadLoadingComponent.displayName = nameof(UploadLoadingComponent);

export default UploadLoadingComponent;
