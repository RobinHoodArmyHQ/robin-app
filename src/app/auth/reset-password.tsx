import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, Text, TextField, View } from 'react-native-ui-lib';

import IconEmail from '@/../assets/icons/email.svg';
import ArrowRight from '@/../assets/icons/right-arrow.svg';
import { HeaderWithLogo } from '@/components/header-with-logo';

export default function ResetPasswordScreen() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [, setEmail] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <HeaderWithLogo />

      <View style={{ marginHorizontal: 24, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 28,
            color: Colors.rhaBlack,
            marginTop: 32,
            marginBottom: 24,
          }}
        >
          Reset Password
        </Text>
        <Text
          style={{
            color: Colors.rhaBlack,
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Please enter your email address to request a password reset
        </Text>

        <TextField
          style={styles.formInput}
          containerStyle={styles.formFieldContainer}
          fieldStyle={styles.formField}
          floatingPlaceholderStyle={styles.formPlaceholder}
          validationMessageStyle={styles.formFieldValidationMessage}
          placeholder={'Email'}
          enableErrors
          floatingPlaceholder
          placeholderTextColor={Colors.grey_1}
          validate={['required', 'email']}
          validationMessage={['Email is required', 'Email is invalid']}
          validateOnBlur
          validateOnChange
          keyboardType="email-address"
          autoCapitalize="none"
          leadingAccessory={<IconEmail />}
          onChangeValidity={(isValid) => {
            setIsEmailValid(isValid);
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <Button
          label="Send"
          iconOnRight
          iconSource={ArrowRightIcon}
          iconStyle={{}}
          labelStyle={{
            marginRight: 16,
            fontFamily: 'poppinsSemiBold',
            fontWeight: 'bold',
          }}
          backgroundColor={Colors.rhaGreen}
          borderRadius={8}
          marginT-24
          style={{ height: 56, alignSelf: 'stretch' }}
          disabled={!isEmailValid}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formFieldContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  formField: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_1,
    height: 32,
  },
  formInput: {
    fontSize: 14,
    paddingLeft: 8,
  },
  formPlaceholder: {
    paddingLeft: 8,
    fontSize: 14,
    lineHeight: 32,
  },
  formFieldValidationMessage: {
    paddingTop: 4,
  },
});

function ArrowRightIcon() {
  return <ArrowRight width={8} translateY={1} />;
}
