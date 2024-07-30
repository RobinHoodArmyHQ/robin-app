import LottieView from 'lottie-react-native';
import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import { Button } from '../form/button';
import { Lottie } from '../lottie';

export function Overlay({
  message,
  messageStyle,
  showButton = false,
  buttonLabel,
  onButtonPress,
  type,
  containerStyle,
}: {
  message: string;
  messageStyle?: TextStyle;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonPress?: () => void;
  type: 'success' | 'loading' | 'error';
  containerStyle?: ViewStyle;
}) {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <LottieView
        loop={true}
        speed={0.8}
        autoPlay
        style={styles.lottie}
        source={type === 'success' ? Lottie.Success : Lottie.Loading}
      />
      <Text style={{ ...styles.message, ...messageStyle }}>{message}</Text>
      {showButton && (
        <Button marginT-40 label={buttonLabel} onPress={onButtonPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  lottie: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  message: { textAlign: 'center', fontSize: 18, color: Colors.grey_3 },
});
