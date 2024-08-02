import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import RHA from '@/components';
import { EmailInput } from '@/components/form/email-input';
import { HeaderWithLogo } from '@/components/ui/header-with-logo';

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

        <EmailInput
          validateOnChange
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

function ArrowRightIcon() {
  return <RHA.Icons.ArrowRight width={8} translateY={1} fill={Colors.white} />;
}
