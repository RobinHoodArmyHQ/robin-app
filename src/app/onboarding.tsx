import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Carousel, Colors, Image, View } from 'react-native-ui-lib';

import ArrowRight from '@/../assets/icons/right-arrow.svg';
import { HeaderWithLogo } from '@/components/header-with-logo';
import { useIsFirstTime } from '@/core/hooks';
import { Text } from '@/ui';

const IMAGES = [
  'https://images.moneycontrol.com/static-mcnews/2017/04/Robin-Hood-Army-770x428.jpg?impolicy=website&width=770&height=431',
  'https://indiaeducationdiary.in/wp-content/uploads/2021/08/Pic-2.jpg',
  'https://thesmetimes.com/wp-content/uploads/2020/07/Robin-Hood-Army_1.jpg',
];

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <HeaderWithLogo />
      <Carousel
        autoplay
        animated
        containerStyle={styles.carouselContainer}
        pageControlProps={{
          limitShownPages: true,
          containerStyle: styles.loopCarousel,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
        loop
      >
        {IMAGES.map((image, i) => {
          return (
            <View flex centerV key={i}>
              <Image
                cover
                overlayType={Image.overlayTypes.BOTTOM}
                style={{ flex: 1 }}
                source={{
                  uri: image,
                }}
              />
            </View>
          );
        })}
      </Carousel>
      <View
        padding-24
        style={{
          flexGrow: 1,
        }}
      >
        <View center style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.rhaGreen,
              marginTop: 32,
              marginBottom: 24,
              lineHeight: 42,
              textAlign: 'center',
            }}
          >
            Welcome to Robin Hood Army!
          </Text>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: Colors.grey_2,
              lineHeight: 24,
            }}
          >
            This is your oppotunoty to be the change! Join thousands of Robins
            in helping to improve someone's life.
          </Text>
        </View>
        {/* <Button label="Skip" link linkColor={Colors.grey_2} /> */}
        <Button
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
          // size={Button.sizes.large}
          borderRadius={8}
          marginT-24
          style={{ height: 56, alignSelf: 'stretch' }}
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/auth/login');
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    height: 280,
  },
  loopCarousel: {
    bottom: 12,
  },
});

function ArrowRightIcon() {
  return <ArrowRight width={8} translateY={1} />;
}
