import React from 'react';
import type { View as ViewType } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Image, View } from 'react-native-ui-lib';

const logo = require('@/../assets/icon.png');

export const HeaderWithLogo = React.forwardRef<ViewType>((props, ref) => {
  return (
    <View {...props} ref={ref} style={styles.container} center>
      <Image source={logo} aspectRatio={1} style={styles.logo} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: Colors.rhaGreen,
  },
  logo: {
    height: 100,
  },
});
