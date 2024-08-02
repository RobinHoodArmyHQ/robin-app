import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

import type { ButtonPropTypes } from './button';
import { Button } from './button';

export const OutlineButton = (props: ButtonPropTypes) => {
  return (
    <Button
      {...props}
      style={styles.outlineStyle}
      labelStyle={styles.labelStyle}
    />
  );
};

const styles = StyleSheet.create({
  outlineStyle: {
    borderWidth: 1,
    borderColor: Colors.rha_green,
    backgroundColor: Colors.white,
  },
  labelStyle: {
    color: Colors.rha_green,
  },
});
