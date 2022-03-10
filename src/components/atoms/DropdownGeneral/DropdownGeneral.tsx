import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './DropdownGeneral.scss';
import type {StyleProp, TextStyle, ViewProps} from 'react-native';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import Modal from 'react-native-modal';
import {SvgIcon} from 'react3l-native-kit';
import {IOS} from 'src/config/const';

/**
 * File: DropdownGeneral.tsx
 * @created 2021-11-22 14:37:25
 * @author TanNgo <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<DropdownGeneralProps>>}
 */
const DropdownGeneral: FC<PropsWithChildren<DropdownGeneralProps>> = (
  props: PropsWithChildren<DropdownGeneralProps>,
): ReactElement => {
  const {
    title,
    titleStyle,
    optionLabelStyle,
    onSelect,
    isBasic,
    style,
    listOptions,
    initial,
    handleChangeTextSearch,
    onResetSearch,
    errorMessage,
    labelField,
  } = props;

  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);

  const handleDropdownOpen = React.useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleDropdownClose = React.useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const handleModelOpen = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleModelClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  const [currentSelection, setCurrentSelection] = React.useState(initial);

  const handleOpenListOption = React.useCallback(() => {
    if (listOptions?.length! > 6) {
      handleModelOpen();
    } else {
      handleDropdownOpen();
    }
  }, [handleDropdownOpen, handleModelOpen, listOptions]);

  const handleCloseListOption = React.useCallback(() => {
    handleDropdownClose();
    handleModelClose();
  }, [handleDropdownClose, handleModelClose]);

  const handleSelect = React.useCallback(
    (value: any) => {
      if (typeof onSelect === 'function') {
        onSelect(value);
      }
      setCurrentSelection(value);
      handleCloseListOption();
    },
    [handleCloseListOption, onSelect],
  );

  return (
    <>
      <View style={style}>
        <TouchableOpacity
          onPress={
            dropdownVisible ? handleCloseListOption : handleOpenListOption
          }
          style={[
            atomicStyles.flexRow,
            atomicStyles.alignItemsCenter,
            atomicStyles.justifyContentBetween,
            atomicStyles.bgWhite,
            styles.bgNone,
            errorMessage && styles.borderError,
          ]}>
          <Text style={[styles.title, atomicStyles.text, titleStyle]}>
            {title}
          </Text>
          <View style={[styles.rightContainer]}>
            <View style={styles.labelContainer}>
              {isBasic ? (
                <Text
                  style={[
                    styles.label,
                    atomicStyles.textCenter,
                    atomicStyles.mr4,
                  ]}
                  numberOfLines={1}>
                  {labelField && currentSelection
                    ? currentSelection[labelField]
                    : currentSelection?.name}
                </Text>
              ) : (
                <TouchableOpacity
                  style={[
                    atomicStyles.flexRow,
                    atomicStyles.alignItemsCenter,
                    styles.selectedItem,
                  ]}>
                  <Text style={[atomicStyles.textCenter, styles.selectedLabel]}>
                    {labelField && currentSelection
                      ? currentSelection[labelField]
                      : currentSelection?.name}
                  </Text>
                  <SvgIcon
                    component={require('assets/icons/12/blue-close.svg')}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={[styles.iconR]}>
              {dropdownVisible || modalVisible ? (
                <SvgIcon component={require('assets/icons/16/arrow-up.svg')} />
              ) : (
                <SvgIcon
                  component={require('assets/icons/16/arrow-down.svg')}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {errorMessage &&
          typeof errorMessage === 'string' &&
          errorMessage.length > 0 && (
            <Text style={[styles.valueHaveErrorMessage]}> {errorMessage}</Text>
          )}

        {dropdownVisible && (
          <View style={[styles.bgNone, atomicStyles.mt1, atomicStyles.p2]}>
            {listOptions?.map((item, index) => {
              return isBasic ? (
                <TouchableOpacity
                  style={[
                    atomicStyles.py2,
                    atomicStyles.px4,
                    currentSelection?.id === item.id && styles.selectedOption,
                  ]}
                  key={index}
                  onPress={() => handleSelect(item)}>
                  <Text style={[styles.itemTitle, optionLabelStyle]}>
                    {labelField && item ? item[labelField] : item.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    atomicStyles.py2,
                    atomicStyles.px4,
                    atomicStyles.flexRow,
                    atomicStyles.alignItemsCenter,
                    currentSelection?.id === item.id &&
                      styles.selectedOptionSpecial,
                  ]}
                  key={index}
                  onPress={() => handleSelect(item)}>
                  <View style={styles.radioButton}>
                    {currentSelection?.id === item.id ? (
                      <SvgIcon
                        component={require('assets/icons/16/radio-button.svg')}
                      />
                    ) : (
                      <SvgIcon
                        component={require('assets/icons/16/radio-button-blank.svg')}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.itemTitle,
                      currentSelection?.id === item.id && styles.disableText,
                      optionLabelStyle,
                    ]}>
                    {labelField && item ? item[labelField] : item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleCloseListOption}
        onModalHide={onResetSearch}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleModal}>{title}</Text>
          <View style={[styles.inputModalContainer, IOS && atomicStyles.py2]}>
            <SvgIcon component={require('assets/icons/16/search.svg')} />
            <TextInput
              onChangeText={handleChangeTextSearch}
              style={styles.inputModal}
              placeholder={'Tìm kiếm....'}
            />
          </View>
          <ScrollView>
            {listOptions?.map((item: any, index: number) => (
              <TouchableOpacity
                style={[
                  atomicStyles.py2,
                  atomicStyles.px4,
                  currentSelection?.id === item.id && styles.selectedOption,
                ]}
                key={index}
                onPress={() => handleSelect(item)}>
                <Text style={[styles.itemTitle, optionLabelStyle]}>
                  {labelField && item ? item[labelField] : item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export interface DropdownGeneralProps extends ViewProps {
  //
  title: string;

  titleStyle?: StyleProp<TextStyle>;

  optionLabelStyle?: StyleProp<TextStyle>;

  iconRight?: ReactElement;

  listLabelOptions?: string[];

  onSelect?: (item: any) => void;

  isBasic?: boolean;

  initial?: any;

  listOptions?: any[];

  handleChangeTextSearch?: (text: string) => void;

  onResetSearch?: () => void;

  errorMessage?: string;

  labelField?: string;
}

DropdownGeneral.defaultProps = {
  //
};

DropdownGeneral.propTypes = {
  //
};

DropdownGeneral.displayName = nameof(DropdownGeneral);

export default DropdownGeneral;
