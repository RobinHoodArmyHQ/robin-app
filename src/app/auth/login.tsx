import { Link, Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import FacebookLogo from '@/../assets/icons/facebook_logo.svg';
import GoogleLogo from '@/../assets/icons/google_logo.svg';
import RHA from '@/components';
import { HeaderWithLogo } from '@/components/header-with-logo';
import { useAuth } from '@/core';

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />

      <HeaderWithLogo />

      <View style={{ marginHorizontal: 24, alignItems: 'center' }}>
        <RHA.Type.H1>Login</RHA.Type.H1>

        <RHA.Form.EmailInput />
        <RHA.Form.PasswordInput />

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
            signIn({ access: 'access-token', refresh: 'refresh-token' });
            router.push('/');
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
  return <RHA.Icons.ArrowRight width={8} translateY={1} fill={Colors.white} />;
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
