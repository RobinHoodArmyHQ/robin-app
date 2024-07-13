import React from 'react';
import { Colors, TextField } from 'react-native-ui-lib';

import IconEmail from '@/../assets/icons/email.svg';

import { styles } from './styles';

type PropTypes = {
  placeholder?: string;
  onChangeValidity?: (isValid: boolean) => void;
  onChangeText?: (text: string) => void;
  validateOnChange?: boolean;
};

export const EmailInput = ({
  placeholder = 'Email',
  onChangeValidity,
  onChangeText,
  validateOnChange,
}: PropTypes) => {
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
      placeholderTextColor={Colors.grey_1}
      validate={['required', 'email']}
      validationMessage={['Email is required', 'Email is invalid']}
      validateOnBlur
      validateOnChange={validateOnChange}
      keyboardType="email-address"
      autoCapitalize="none"
      leadingAccessory={<IconEmail stroke={Colors.grey_2} />}
      onChangeValidity={onChangeValidity}
      onChangeText={onChangeText}
    />
  );
};
