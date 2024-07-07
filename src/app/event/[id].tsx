/* eslint-disable max-lines-per-function */
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Assets,
  Avatar,
  Carousel,
  Colors,
  Icon,
  Image,
  Text,
  View,
} from 'react-native-ui-lib';

const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

export default function EventDetailsPage() {
  // const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Event Details',
        }}
      />

      <Carousel
        autoplay
        animated
        containerStyle={styles.carouselContainer}
        pageControlProps={{
          limitShownPages: true,
          containerStyle: styles.loopCarousel,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
        showCounter
        loop
      >
        {IMAGES.map((image, i) => {
          return (
            <View flex centerV key={i}>
              <Image
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

      <View paddingH-24 paddingT-24>
        <Text style={styles.heading}>
          This is a very large Event Name that flows into two lines
        </Text>

        <View style={styles.subHeading}>
          <Text
            style={{
              fontFamily: 'ptsans',
              fontSize: 14,
              color: '#165F30',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Details
          </Text>
        </View>

        <View marginT-16 row>
          <Icon size={24} tintColor="#443E3E" source={Assets.icons.search} />
          <View paddingL-8>
            <Text marginB-4 style={styles.detailsText}>
              14 December, 2021
            </Text>
            <Text style={styles.detailsSubText}>Tuesday, 4:00PM - 9:00PM</Text>
          </View>
        </View>

        <View marginT-16 row>
          <Icon size={24} tintColor="#443E3E" source={Assets.icons.search} />
          <View paddingL-8>
            <Text
              marginB-4
              style={styles.detailsText}
              highlightString={'Pick up:'}
              highlightStyle={styles.detailsTextHighlight}
            >
              Pick up: Chula chauki da dhaba, Jaynagar
            </Text>
            <Text
              marginB-4
              style={styles.detailsText}
              highlightString={'Distribution:'}
              highlightStyle={styles.detailsTextHighlight}
            >
              Distribution: East end cluster
            </Text>
          </View>
        </View>

        <View style={styles.subHeading}>
          <Text
            style={{
              fontFamily: 'ptsans',
              fontSize: 14,
              color: '#165F30',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Robins Attending
          </Text>
        </View>
        <View marginT-16 row centerV>
          <Avatar
            size={36}
            animate
            imageProps={{ animationDuration: 1000 }}
            label="GP"
            imageStyle={{ borderRadius: 4 }}
            source={{
              uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg',
            }}
          />
          <Text style={styles.userTitle}>Seema</Text>
        </View>
        <View marginT-16 row centerV>
          <Avatar
            size={36}
            animate
            imageProps={{
              animationDuration: 1000,
            }}
            label="GP"
            imageStyle={{ borderRadius: 2 }}
            containerStyle={{
              borderRadius: 4,
              backgroundColor: Colors.violet60,
            }}
            useAutoColors
            backgroundColor={Colors.transparent}
          />
          <Text style={styles.userTitle}>Gunjan P</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsText: {
    fontSize: 16,
    color: '#120D26',
  },
  detailsSubText: {
    fontFamily: 'ptsans',
    color: '#747688',
    fontSize: 14,
  },
  detailsTextHighlight: {
    color: '#434246',
    fontFamily: 'poppinsSemiBold',
  },
  subHeading: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: 24,
  },
  heading: {
    fontFamily: 'poppinsSemiBold',
    fontSize: 26,
    lineHeight: 38,
    color: '#1A202C',
  },
  carouselContainer: {
    height: 210,
  },
  loopCarousel: {
    bottom: 12,
  },
  userTitle: {
    fontSize: 18,
    color: '#120D26',
    paddingLeft: 16,
  },
});
