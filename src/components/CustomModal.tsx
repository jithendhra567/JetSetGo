import React from 'react';
import {KeyboardAvoidingView, Modal, Pressable, ViewStyle} from 'react-native';
import {COLORS} from '../utils/styles';
import {HEIGHT, WIDTH} from '../utils/common';

type CustomModalProps = {
  visible: boolean;
  children?: React.ReactNode;
  toggleModal: (val: boolean) => void;
  dismissable?: boolean;
  presentationStyle?:
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'overFullScreen'
    | undefined;
  animationType?: 'slide' | 'fade' | 'none';
  backdropStyle?: ViewStyle;
};

export const CustomModal = ({
  visible,
  dismissable = true,
  toggleModal,
  children,
  presentationStyle,
  animationType = 'fade',
  backdropStyle,
}: CustomModalProps) => {
  return (
    <Modal
      animationType={animationType}
      transparent
      presentationStyle={presentationStyle}
      visible={visible}
      onDismiss={() => toggleModal(false)}
      onRequestClose={() => toggleModal(false)}>
      <Pressable
        style={[
          {
            width: WIDTH,
            height: HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.BLACK_OPAC_50,
          },
          backdropStyle,
        ]}
        onPress={dismissable ? () => toggleModal(false) : undefined}>
        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;
