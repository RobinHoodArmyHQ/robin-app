import _ from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
import openMap from 'react-native-open-maps';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { Icons } from './icons';

const getDateString = (date: Date | undefined) => {
  return date instanceof Date
    ? date.toLocaleDateString([], {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
};

const getTimeString = (date: Date | undefined) => {
  return date instanceof Date
    ? date
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .toLocaleUpperCase()
        .concat(' onwards')
    : '';
};

export const EventDetails = ({
  title,
  description,
  eventStartTime,
  eventLocation,
}: {
  title: string;
  description: string;
  eventStartTime?: Date;
  eventLocation?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
}) => {
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);

  let descriptionShortened = description;
  if (description.length > 150) {
    descriptionShortened = description.slice(0, 150).trim() + '...';
  }

  const dateStr = getDateString(eventStartTime);
  const timeStr = getTimeString(eventStartTime);

  return (
    <>
      <Text style={styles.heading}>{title}</Text>

      <View row style={styles.detailsRowContainer}>
        <View style={styles.iconContainer}>
          <Icons.Calendar fill={Colors.rhaGreen} />
        </View>
        <View>
          <Text style={styles.detailsText}>{dateStr}</Text>
          <Text style={styles.detailsSubText}>{timeStr}</Text>
        </View>
      </View>

      <View row style={styles.detailsRowContainer}>
        <View style={styles.iconContainer}>
          <Icons.LocationPin fill={Colors.rhaGreen} />
        </View>
        <View>
          <Text style={styles.detailsText}>
            {eventLocation?.name ||
              eventLocation?.latitude.toPrecision(8) +
                ', ' +
                eventLocation?.longitude.toPrecision(8)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              openMap({
                // latitude: eventLocation?.latitude,
                // longitude: eventLocation?.longitude,
                query: !_.isEmpty(eventLocation?.name)
                  ? eventLocation?.name
                  : `${eventLocation?.latitude},${eventLocation?.longitude}`,
              });
            }}
          >
            <Text marginB-4 underline style={styles.detailsSubText}>
              View on Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>Details</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setDescriptionExpanded(!descriptionExpanded);
        }}
      >
        <Text style={styles.descriptionText}>
          {descriptionExpanded ? description : descriptionShortened}
          &nbsp;
          {descriptionExpanded ? null : <Text underline>read more</Text>}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    color: Colors.rhaBlack,
    fontFamily: 'Poppins_600SemiBold',
  },
  detailsSubText: {
    fontFamily: 'ptsans',
    color: '#747688',
  },
  subHeading: {
    borderBottomColor: Colors.grey_1,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginTop: 36,
    marginBottom: 8,
  },
  subHeadingText: {
    fontFamily: 'PTSans_400Regular',
    color: Colors.rhaGreen,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 40,
    color: Colors.rhaBlack,
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
