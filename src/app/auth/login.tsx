/* eslint-disable max-lines-per-function */
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Colors,
  Image,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';

import IconEmail from '../../../assets/icons/email.svg';
import FacebookLogo from '../../../assets/icons/facebook_logo.svg';
import GoogleLogo from '../../../assets/icons/google_logo.svg';
import IconPassword from '../../../assets/icons/password.svg';
import ArrowRight from '../../../assets/icons/right-arrow.svg';

export default function LoginScreen() {
  const logo = require('../../../assets/icon.png');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />

      <View
        style={{
          height: 100,
          backgroundColor: Colors.rhaGreen,
        }}
        center
      >
        <Image
          source={logo}
          aspectRatio={1}
          style={{
            height: 100,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 24, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 28,
            color: Colors.rhaGreen,
            marginTop: 32,
            marginBottom: 24,
          }}
        >
          Login
        </Text>

        <TextField
          style={styles.formInput}
          containerStyle={styles.fontFieldContainer}
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
          leadingAccessory={<IconEmail />}
        />

        <TextField
          style={styles.formInput}
          containerStyle={styles.fontFieldContainer}
          fieldStyle={styles.formField}
          floatingPlaceholderStyle={styles.formPlaceholder}
          validationMessageStyle={styles.formFieldValidationMessage}
          placeholder={'Password'}
          enableErrors
          floatingPlaceholder
          validate={['required', (value: string) => value.length > 6]}
          validationMessage={['Password is required', 'Password is too short']}
          validateOnBlur
          leadingAccessory={<IconPassword />}
        />

        <Link
          href="/auth/reset-password"
          style={{ alignSelf: 'flex-end', paddingVertical: 4 }}
        >
          Forgot Password?
        </Link>

        <Button
          label="Login"
          iconOnRight
          iconSource={ArrowRightIcon}
          iconStyle={{}}
          labelStyle={{
            marginRight: 12,
            fontFamily: 'poppinsSemiBold',
            fontWeight: 'bold',
          }}
          backgroundColor={Colors.rhaGreen}
          size={Button.sizes.large}
          borderRadius={8}
          marginT-24
        />

        <Text marginV-24 style={{ color: Colors.grey_2 }}>
          OR
        </Text>

        <Button
          label="Login with Google"
          iconSource={GoogleLogoIcon}
          backgroundColor={Colors.white}
          borderRadius={12}
          labelStyle={styles.socialButtonLabel}
          style={styles.socialButton}
        />

        <Button
          marginT-16
          label="Login with Facebook"
          iconSource={FacebookLogoIcon}
          backgroundColor={Colors.white}
          style={styles.socialButton}
          labelStyle={styles.socialButtonLabel}
          borderRadius={12}
        />

        <Text marginT-24>
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            style={{
              color: Colors.rhaGreen,
              fontFamily: 'poppinsSemiBold',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </Link>
        </Text>
      </View>
    </>
  );
}

function ArrowRightIcon() {
  return <ArrowRight width={8} />;
}

function GoogleLogoIcon() {
  return <GoogleLogo />;
}

function FacebookLogoIcon() {
  return <FacebookLogo />;
}

const styles = StyleSheet.create({
  fontFieldContainer: {
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
  socialButton: {
    alignSelf: 'stretch',
    elevation: 1,
    height: 56,
    shadowColor: '#443E3EE1',
    borderWidth: 1,
    borderColor: '#E5E5E555',
  },
  socialButtonLabel: {
    color: Colors.rhaBlack,
    paddingLeft: 12,
  },
});
