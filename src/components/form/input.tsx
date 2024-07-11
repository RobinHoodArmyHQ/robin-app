import React from 'react';
import type Validator from 'react-native-ui-lib';
import { Colors, TextField } from 'react-native-ui-lib';

import { styles } from './styles';

type PropTypes = {
  placeholder?: string;
  value?: string;
  validate?:
    | Validator.Incubator.TextFieldValidator
    | Validator.Incubator.TextFieldValidator[];
  validationMessage?: string | string[];
  onChangeValidity?: (isValid: boolean) => void;
  onChangeText?: (text: string) => void;
  validateOnChange?: boolean;
  leadingAccessory?: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  multiline?: boolean;
  numberOfLines?: number;
  floatingPlaceHolder?: boolean;
  editable?: boolean;
};

export const Input = React.forwardRef<
  Validator.Incubator.TextFieldRef,
  PropTypes
>(
  (
    {
      placeholder,
      value,
      validate,
      validationMessage,
      validateOnChange,
      leadingAccessory,
      onChangeText,
      onChangeValidity,
      multiline,
      numberOfLines,
      floatingPlaceHolder = true,
      editable,
    }: PropTypes,
    ref
  ) => {
    return (
      <TextField
        ref={ref}
        style={styles.formInput}
        containerStyle={styles.formFieldContainer}
        fieldStyle={styles.formField}
        floatingPlaceholderStyle={styles.formPlaceholder}
        validationMessageStyle={styles.formFieldValidationMessage}
        placeholder={placeholder}
        value={value}
        enableErrors
        floatingPlaceholder={floatingPlaceHolder}
        placeholderTextColor={Colors.grey_1}
        validate={validate}
        validationMessage={validationMessage}
        validateOnBlur
        validateOnChange={validateOnChange}
        autoCapitalize="words"
        leadingAccessory={leadingAccessory}
        onChangeValidity={onChangeValidity}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
    );
  }
);

Input.displayName = 'Input';
