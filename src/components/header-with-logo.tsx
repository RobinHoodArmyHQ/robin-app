import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Image, View } from 'react-native-ui-lib';

const logo = require('@/../assets/icon.png');

export const HeaderWithLogo = (props: React.ComponentProps<any>) => {
  return (
    <View {...props} style={styles.container} center>
      <Image source={logo} aspectRatio={1} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: Colors.rhaGreen,
  },
  logo: {
    height: 100,
  },
});
