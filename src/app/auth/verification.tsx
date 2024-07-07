import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import ArrowRight from '@/../assets/icons/right-arrow.svg';
import { HeaderWithLogo } from '@/components/header-with-logo';

export default function VerificationScreen() {
  const email = undefined; // TODO
  const CELL_COUNT = 4;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
          Verification
        </Text>
        <Text
          style={{
            color: Colors.rhaBlack,
            textAlign: 'center',
            marginBottom: 36,
          }}
        >
          We've sent you the verification code on {email ? email : 'your email'}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Button
          link
          linkColor={Colors.grey_2}
          marginT-32
          label="Re-send code"
          // TODO
        />
        <Button
          marginT-32
          label="Continue"
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
          style={{ height: 56, alignSelf: 'stretch' }}
          disabled={false}
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
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.grey_1,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Colors.rhaBlack,
    fontSize: 32,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: Colors.rhaGreen,
    borderBottomWidth: 2,
  },
});

function ArrowRightIcon() {
  return <ArrowRight width={8} translateY={1} />;
}
