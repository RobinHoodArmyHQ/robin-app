import React from 'react';
import { type ImageStyle, type StyleProp, StyleSheet } from 'react-native';
import type { ButtonProps } from 'react-native-ui-lib';
import { Button as RNUIButton, Colors } from 'react-native-ui-lib';
import type { ImageSourceType } from 'react-native-ui-lib/src/components/image';

type ButtonType = 'primary' | 'secondary';

type PropTypes = {
  label?: string;
  type?: ButtonType;
  onPress?: ((props?: any) => void) & ((props: any) => void);
  iconOnRight?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  iconSource?:
    | ImageSourceType
    | ((iconStyle?: StyleProp<ImageStyle>[] | undefined) => JSX.Element);
  props?: ButtonProps;
};

export const Button = ({
  label = 'Next',
  onPress,
  type = 'primary',
  iconSource,
  iconStyle,
  iconOnRight,
  ...props
}: PropTypes) => {
  return (
    <RNUIButton
      {...props}
      label={label}
      iconOnRight={iconOnRight}
      iconSource={iconSource}
      iconStyle={iconStyle}
      labelStyle={styles.labelStyle}
      backgroundColor={type === 'primary' ? Colors.rhaGreen : Colors.grey_1}
      borderRadius={8}
      style={styles.buttonStyle}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginRight: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: 600,
  },
  buttonStyle: { height: 56 },
});
