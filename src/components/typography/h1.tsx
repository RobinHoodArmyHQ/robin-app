import React from 'react';
import { StyleSheet } from 'react-native';
import type { TextProps } from 'react-native-ui-lib';
import { Colors, Text } from 'react-native-ui-lib';

const H1 = ({ children, style, ...rest }: TextProps) => {
  return (
    <Text {...rest} style={[styles.heading, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    color: Colors.rhaGreen,
    marginTop: 32,
    marginBottom: 24,
  },
});

export default H1;
