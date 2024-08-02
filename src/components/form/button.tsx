import React from 'react';
import type { Animated, TextStyle, ViewStyle } from 'react-native';
import { type ImageStyle, type StyleProp, StyleSheet } from 'react-native';
import type { ButtonProps } from 'react-native-ui-lib';
import { Button as RNUIButton, Colors } from 'react-native-ui-lib';
import type { ImageSourceType } from 'react-native-ui-lib/src/components/image';

type ButtonType = 'primary' | 'secondary';

export type ButtonPropTypes = {
  label?: string;
  type?: ButtonType;
  onPress?: ((props?: any) => void) & ((props: any) => void);
  iconOnRight?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  iconSource?:
    | ImageSourceType
    | ((iconStyle?: StyleProp<ImageStyle>[] | undefined) => JSX.Element);
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  labelStyle?: StyleProp<TextStyle>;
  props?: ButtonProps;
};

export const Button = ({
  label = 'Next',
  onPress,
  type = 'primary',
  iconSource,
  iconStyle,
  iconOnRight,
  style,
  labelStyle,
  ...props
}: ButtonPropTypes) => {
  return (
    <RNUIButton
      {...props}
      label={label}
      iconOnRight={iconOnRight}
      iconSource={iconSource}
      iconStyle={iconStyle}
      labelStyle={[styles.labelStyle, labelStyle]}
      backgroundColor={type === 'primary' ? Colors.rhaGreen : Colors.grey_1}
      borderRadius={8}
      style={[styles.buttonStyle, style]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginHorizontal: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: 600,
  },
  buttonStyle: { height: 56 },
});
