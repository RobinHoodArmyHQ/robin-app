import React from 'react';
import { Colors, TextField } from 'react-native-ui-lib';

import IconPassword from '@/../assets/icons/password.svg';

import { styles } from './styles';

type PropTypes = {
  placeholder?: string | undefined;
};

export const PasswordInput = ({ placeholder = 'Password' }: PropTypes) => {
  return (
    <TextField
      style={styles.formInput}
      containerStyle={styles.formFieldContainer}
      fieldStyle={styles.formField}
      floatingPlaceholderStyle={styles.formPlaceholder}
      validationMessageStyle={styles.formFieldValidationMessage}
      placeholder={placeholder}
      enableErrors
      floatingPlaceholder
      validate={['required', (value: string) => value.length > 6]}
      validationMessage={['Password is required', 'Password is too short']}
      validateOnBlur
      validateOnChange
      leadingAccessory={<IconPassword stroke={Colors.grey_2} />}
      secureTextEntry
    />
  );
};
