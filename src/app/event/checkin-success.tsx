import { router, Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Share from 'react-native-share';
import { Colors, Text, View } from 'react-native-ui-lib';

import RHA from '@/components';
import { HeaderWithLogo } from '@/components/header-with-logo';

export default function CheckinSuccessScreen() {
  const showShareOptions = () => {
    Share.open({
      title: 'Check-in successful!',
      message: 'You have successfully checked in to the event.',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <>
      {/* <Stack.Screen
        options={{
          title: 'Check In Successful',
        }}
      /> */}
      <Stack.Screen
        options={{
          title: '',
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />

      <HeaderWithLogo />
      <View style={styles.animationContainer}>
        <LottieView
          loop={true}
          speed={0.8}
          autoPlay
          style={{
            width: 120,
            height: 120,
          }}
          source={require('@/../assets/lottie/success.lottie')}
        />

        <Text style={{ fontSize: 18, color: Colors.grey_3 }}>
          Check-in successful!
        </Text>

        <RHA.Form.Button
          marginT-40
          label="Share with the world"
          iconSource={() => <RHA.Icons.Share fill={Colors.white} width={44} />}
          onPress={showShareOptions}
        />

        <TouchableOpacity
          style={{ marginTop: 24 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: Colors.grey_2 }}>
            I'll do it later, promise
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 60,
  },
});
