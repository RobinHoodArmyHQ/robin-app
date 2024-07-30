/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Colors, Text, View } from 'react-native-ui-lib';

import { useGetEvent } from '@/api/events/use-get-event-details';
import RHA from '@/components';
import { EventDetails } from '@/components/event-details';

// const IMAGES = [
//   'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
// ];

export default function EventDetailsPage() {
  const { id } = useLocalSearchParams();

  if (typeof id !== 'string') {
    // TODO: handle error
    return null;
  }

  const {
    data: getEventResponse,
    isLoading: isLoadingGetEvent,
    // error: errorGetEvent,
    //    refetch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useGetEvent({ event_id: id });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Event Details',
        }}
      />

      {isLoadingGetEvent && <RHA.UI.Overlay message="Loading" type="loading" />}

      {/* <Carousel
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
      </Carousel> */}

      <View paddingH-24 paddingT-24>
        <EventDetails
          title={getEventResponse?.event.title ?? ''}
          description={getEventResponse?.event.description ?? ''}
          eventStartTime={getEventResponse?.event.start_time ?? new Date()}
          eventLocation={getEventResponse?.event.event_location}
        />
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
    // fontSize: 16,
    color: Colors.rhaBlack,
    fontFamily: 'Poppins_600SemiBold',
  },
  detailsSubText: {
    fontFamily: 'ptsans',
    color: '#747688',
    fontSize: 14,
  },
  detailsTextHighlight: {
    color: '#434246',
    fontFamily: 'Poppins_600SemiBold',
  },
  subHeading: {
    borderBottomColor: Colors.grey_1,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginTop: 36,
    marginBottom: 8,
  },
  heading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 40,
    color: Colors.rhaBlack,
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
  iconContainer: {
    backgroundColor: Colors.rgba(Colors.rhaGreen, 0.2),
    borderRadius: 5,
    height: 46,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailsRowContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  descriptionText: {
    lineHeight: 24,
  },
});
