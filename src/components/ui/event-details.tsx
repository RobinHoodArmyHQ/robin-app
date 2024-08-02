import { router } from 'expo-router';
import _ from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
import openMap from 'react-native-open-maps';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { OutlineButton } from '../form';
import { Icons } from '../icons';

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
  eventId,
  title,
  description,
  eventStartTime,
  eventLocation,
  preview,
}: {
  eventId: string;
  title: string;
  description: string;
  eventStartTime?: Date;
  eventLocation?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  preview?: boolean;
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
          <Icons.Calendar fill={Colors.rha_green} />
        </View>
        <View>
          <Text style={styles.detailsText}>{dateStr}</Text>
          <Text style={styles.detailsSubText}>{timeStr}</Text>
        </View>
      </View>

      <View row style={styles.detailsRowContainer}>
        <View style={styles.iconContainer}>
          <Icons.LocationPin fill={Colors.rha_green} />
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

      {!preview && renderActionButtons(eventId, eventStartTime)}

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

const isPastEvent = (eventStartTime: Date | undefined) => {
  return eventStartTime instanceof Date && eventStartTime < new Date();
};

const renderActionButtons = (
  eventId: string,
  eventStartTime: Date | undefined
) => {
  return (
    <View
      style={{
        marginTop: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      {isPastEvent(eventStartTime) ? (
        <View
          style={{
            flex: 1,
            flexGrow: 1,
          }}
        >
          <OutlineButton
            iconSource={Icons.render(Icons.CheckIn, {
              stroke: Colors.rha_green,
              height: 16,
              width: 16,
            })}
            label="Check In"
            onPress={() => {
              router.navigate({
                pathname: '/event/checkin',
                params: {
                  event_id: eventId,
                },
              });
            }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              marginRight: 10,
              flex: 1,
              flexGrow: 1,
            }}
          >
            <OutlineButton
              iconSource={Icons.render(Icons.Plus, {
                stroke: Colors.rha_green,
                height: 16,
                width: 16,
              })}
              label="Join Event"
              onPress={() => {
                console.log('Join Event');
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
              flexGrow: 1,
              flex: 1,
            }}
          >
            <OutlineButton
              label="Share"
              iconSource={Icons.render(Icons.Share, {
                fill: Colors.rha_green,
                height: 16,
                width: 16,
              })}
              onPress={() => {
                console.log('Share');
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    color: Colors.rha_black,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 24,
    paddingRight: 24,
  },
  detailsSubText: {
    fontFamily: 'Poppins_400Regular',
    color: Colors.rha_grey3,
  },
  subHeading: {
    borderBottomColor: Colors.rha_grey1,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginTop: 36,
    marginBottom: 8,
  },
  subHeadingText: {
    fontFamily: 'PTSans_400Regular',
    color: Colors.rha_green,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 40,
    color: Colors.rha_black,
  },
  iconContainer: {
    backgroundColor: Colors.rgba(Colors.rha_green, 0.2),
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
