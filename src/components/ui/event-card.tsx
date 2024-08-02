import { router } from 'expo-router';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import type { Event } from '@/api';
import { getDateString, getTimeString } from '@/core';

import { Icons } from '../icons';

type EventCardProps = {
  event: Event;
  containerStyle?: ViewStyle;
};

export const Card = ({ event, containerStyle }: EventCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      throttleTime={250}
      activeScale={0.98}
      activeBackgroundColor={Colors.grey1}
      style={containerStyle}
      onPress={() => {
        router.navigate(`/event/${event.event_id}`);
      }}
    >
      <View
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          elevation: 10,
          shadowColor: Colors.grey40,
          backgroundColor: Colors.white,
        }}
      >
        {/* <Image
            source={{
              uri: 'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400',
            }}
            style={{ height: 100 }}
          /> */}
        <MapView
          cacheEnabled
          liteMode
          loadingEnabled
          scrollEnabled={false}
          zoomEnabled={false}
          zoomTapEnabled={false}
          toolbarEnabled={false}
          zoomControlEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          style={{ height: 100 }}
          region={{
            latitude: event.event_location.latitude,
            longitude: event.event_location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
          }}
        />
        <View style={{ padding: 16, backgroundColor: Colors.white }}>
          <Text style={styles.title}>{event.title}</Text>
          <View row marginB-12>
            <Icons.Calendar fill={Colors.grey_2} width={16} height={28} />
            <View marginL-8>
              <Text
                column
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                }}
              >
                {getDateString(event.start_time)}
              </Text>
              <Text>{getTimeString(event.start_time)}</Text>
            </View>
          </View>

          <View row marginB-12>
            <Icons.LocationPin fill={Colors.grey_2} width={16} />
            <View marginL-8>
              <Text column style={{}}>
                Behind One Horizon Center, Sector 52, Gurgaon, Haryana
              </Text>
            </View>
          </View>

          <View row>
            <Text column style={{}}>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>
                Neel Ghose
              </Text>{' '}
              & 12 other Robins are joining
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});
