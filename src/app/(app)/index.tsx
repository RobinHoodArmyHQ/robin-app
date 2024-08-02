/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import type { PickerItemProps, PickerMethods } from 'react-native-ui-lib';
import {
  Avatar,
  Carousel,
  Colors,
  Picker,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import type { City, Event } from '@/api';
import { useGetUpcomingEvents } from '@/api';
import RHA from '@/components';
import { getItem, setItem } from '@/core/storage';

export default function Feed() {
  const initialState: {
    selectedCity?: City;
  } = {
    selectedCity: undefined,
  };
  const [state, setState] = useState(initialState);

  const cities = getItem<City[]>('global.cities');
  const citiesOptions: PickerItemProps[] = cities
    ? cities.map((city) => ({
        value: city.city_id,
        label: city.name,
      }))
    : [];

  const selectedCity = getItem<City>('global.selectedCity');
  console.log('selectedCity', selectedCity);

  const citiesPickerRef = React.createRef<PickerMethods>();
  if (selectedCity === null && cities && cities.length) {
    setTimeout(() => {
      citiesPickerRef.current?.openExpandable();
    }, 100);
  } else if (selectedCity.city_id !== state.selectedCity?.city_id) {
    setState({ ...state, selectedCity });
  }

  const {
    data: getUpcomingEventsResponse,
    // isLoading: isLoadingGetUpcomingEvents,
    // error: errorGetEvent,
    //    refetch,
  } = useGetUpcomingEvents({
    city_id: selectedCity.city_id,
    offset: 0,
    limit: 5,
    user_location: {
      latitude: 0,
      longitude: 0,
    },
  });

  // const { data, isPending, isError } = usePosts();
  // const renderItem = React.useCallback(
  //   ({ item }: { item: Post }) => <Card {...item} />,
  //   []
  // );

  // if (isError) {
  //   return (
  //     <View>
  //       <Text> Error Loading data </Text>
  //     </View>
  //   );
  // }
  return (
    <>
      <View
        style={{
          padding: 16,
          backgroundColor: Colors.rhaGreen,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            // flexGrow: 1,
            marginRight: 48,
          }}
        >
          <Picker
            placeholder="Select city"
            topBarProps={{ title: 'Select your city' }}
            value={state.selectedCity?.city_id}
            items={citiesOptions}
            // showSearch // there's a bug in react-native-ui-lib, wait for it to get fixed upstream
            ref={citiesPickerRef}
            fieldType="filter"
            enableModalBlur={false}
            onChange={(value) => {
              const city = cities.find((c) => c.city_id === value);
              if (city) {
                setState({ ...state, selectedCity: city });
                setItem<City>('global.selectedCity', city);
              } else {
                console.log('City not found');
              }
            }}
            style={{
              fontSize: 16,
              lineHeight: 32,
              height: 32,
              color: Colors.white,
            }}
            placeholderTextColor={Colors.white}
            leadingAccessory={
              <RHA.Icons.LocationPin
                fill={Colors.white}
                width={18}
                height={20}
                style={{ marginRight: 12 }}
              />
            }
            trailingAccessory={
              <RHA.Icons.ArrowDown
                stroke={Colors.white}
                width={12}
                height={12}
                style={{ marginLeft: 16 }}
              />
            }
          />
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 8 }}
          onPress={() => {
            return router.navigate({ pathname: '/event/create' });
          }}
        >
          <Text style={{ color: Colors.white }}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: Colors.grey90 }}>
        <RHA.Type.H1
          style={{
            fontFamily: 'Poppins_600SemiBold',
            letterSpacing: -0.7,
            paddingHorizontal: 20,
          }}
        >
          Welcome Robin!
        </RHA.Type.H1>

        <Text
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            fontSize: 16,
            color: Colors.grey_2,
            textTransform: 'uppercase',
          }}
        >
          Upcomings events in {selectedCity ? selectedCity.name : 'your city'}
        </Text>
        <Carousel
          pageControlProps={{
            size: 6,
            containerStyle: { position: 'relative', top: -10 },
          }}
          pageControlPosition={Carousel.pageControlPositions.OVER}
          // showCounter
          animated
        >
          {getUpcomingEventsResponse?.events.map((e: Event, i) => (
            <RHA.UI.Card
              key={i}
              event={e}
              containerStyle={{ marginHorizontal: 20, marginBottom: 20 }}
            />
          ))}
        </Carousel>

        <Text
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            fontSize: 16,
            color: Colors.grey_2,
            textTransform: 'uppercase',
          }}
        >
          Latest activity in {selectedCity ? selectedCity.name : 'your city'}
        </Text>

        <View
          style={{
            elevation: 10,
            shadowColor: Colors.grey40,
            backgroundColor: Colors.white,
            padding: 16,
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 8,
          }}
        >
          <View row>
            <Avatar
              size={48}
              animate
              imageProps={{ animationDuration: 1000 }}
              label="MA"
              imageStyle={{ borderRadius: 4 }}
              source={{
                uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg',
              }}
            />
            <View style={{ marginLeft: 8 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 16,
                  lineHeight: 28,
                }}
              >
                Mridul Anand
              </Text>
              <Text style={{ color: Colors.grey_2 }}>15 checkins</Text>
            </View>
          </View>
          <View row marginV-16>
            {/* <RHA.Icons.Clock fill={Colors.grey_2} height={16} /> */}
            <Text style={{ fontSize: 14 }}>checked in 24 minutes ago</Text>
          </View>
          <Text style={{ fontStyle: 'italic', color: Colors.grey_2 }}>
            "An amazin experience going for a drive with other Robins."
          </Text>
        </View>
      </ScrollView>

      {/* <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      /> */}
    </>
  );
}
