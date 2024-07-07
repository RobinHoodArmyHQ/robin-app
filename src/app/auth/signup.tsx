/* eslint-disable max-lines-per-function */
import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import FacebookLogo from '@/../assets/icons/facebook_logo.svg';
import GoogleLogo from '@/../assets/icons/google_logo.svg';
import ArrowRight from '@/../assets/icons/right-arrow.svg';
import EmailInput from '@/components/form/email-input';
import NameInput from '@/components/form/name-input';
import PasswordInput from '@/components/form/password-input';
import { HeaderWithLogo } from '@/components/header-with-logo';

export default function SignupScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sign Up',
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />

      <HeaderWithLogo />

      <ScrollView
        style={{ paddingHorizontal: 24 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text
          style={{
            fontSize: 28,
            color: Colors.rhaGreen,
            marginTop: 32,
            marginBottom: 24,
          }}
        >
          Sign Up
        </Text>

        <View row>
          <NameInput
            placeholder={'First Name'}
            validate={['required']}
            validationMessage={['First name is required']}
          />
          <NameInput
            placeholder={'Last Name'}
            validate={['required']}
            validationMessage={['Last name is required']}
          />
        </View>
        <EmailInput />
        <PasswordInput />
        <PasswordInput placeholder="Confirm Password" />

        <Button
          label="Sign Up"
          iconOnRight
          iconSource={ArrowRightIcon}
          iconStyle={{}}
          labelStyle={{
            marginRight: 16,
            fontFamily: 'poppinsSemiBold',
            fontWeight: 'bold',
          }}
          backgroundColor={Colors.rhaGreen}
          // size={Button.sizes.large}
          borderRadius={8}
          marginT-24
          style={{ height: 56, alignSelf: 'stretch' }}
          onPress={() => {
            router.push('/auth/verification');
          }}
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

        <Text
          marginV-48
          style={{
            color: Colors.rhaBlack,
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Already have an account? <Link href="/auth/login">Login</Link>
        </Text>
      </ScrollView>
    </>
  );
}

function ArrowRightIcon() {
  return <ArrowRight width={8} translateY={1} />;
}

function GoogleLogoIcon() {
  return <GoogleLogo />;
}

function FacebookLogoIcon() {
  return <FacebookLogo />;
}

const styles = StyleSheet.create({
  socialButton: {
    alignSelf: 'stretch',
    elevation: 4,
    height: 56,
    shadowColor: '#443E3E56',
    borderWidth: 1,
    borderColor: '#E5E5E555',
  },
  socialButtonLabel: {
    color: Colors.rhaBlack,
    paddingLeft: 12,
  },
});
