import React from 'react';
import styles from './PrintingFile.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {atomicStyles} from 'src/styles';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {ANDROID} from 'src/config/const';
import {SvgIcon} from 'react3l-native-kit';
import {Swipeable} from 'react-native-gesture-handler';

export function PrintingFile(
  props: PropsWithChildren<PrintingFileProps>,
): ReactElement {
  const {title, onPrint, onDelete} = props;

  const rightSwipe = (_progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.5, 0],

      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={onDelete}
        style={[styles.buttonDelete, atomicStyles.bgDanger]}>
        <Animated.View
          style={[{transform: [{scale: scale}]}, atomicStyles.textWhite]}>
          <SvgIcon component={require('assets/icons/24/white-garbage.svg')} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={[styles.fileContainer, atomicStyles.bgWhite]}>
          <Text
            style={[
              atomicStyles.textDark,
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
            ]}>
            {title}
          </Text>

          <TouchableOpacity onPress={onPrint}>
            <SvgIcon component={require('assets/icons/24/blue-3d-cube.svg')} />
          </TouchableOpacity>
        </View>
      </Swipeable>
    </>
  );
}

export interface PrintingFileProps {
  //
  title?: string;

  onPrint?: () => void;

  onDelete?: () => void;
}

PrintingFile.defaultProps = {
  //
};

PrintingFile.displayName = nameof(PrintingFile);

export default PrintingFile;
