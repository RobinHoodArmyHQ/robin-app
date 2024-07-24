/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import type { PickerItemProps, PickerMethods } from 'react-native-ui-lib';
import {
  Avatar,
  Colors,
  Picker,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import type { City } from '@/api/location/cities';
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

        <TouchableOpacity
          activeOpacity={0.9}
          throttleTime={250}
          activeScale={0.98}
          activeBackgroundColor={Colors.grey1}
          style={{ paddingHorizontal: 20 }}
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
                latitude: 28.3,
                longitude: 77.4,
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
              }}
              onPress={() => {}}
            />
            <View style={{ padding: 10, backgroundColor: Colors.white }}>
              <Text
                style={{
                  marginBottom: 8,
                  fontSize: 18,
                  fontFamily: 'Poppins_600SemiBold',
                }}
              >
                Friday Food Drive
              </Text>
              <View row marginB-12>
                <RHA.Icons.Calendar
                  fill={Colors.grey_2}
                  width={16}
                  height={28}
                />
                <View marginL-8>
                  <Text
                    column
                    style={{
                      fontFamily: 'Poppins_600SemiBold',
                    }}
                  >
                    Saturday, 4<Text style={{ fontSize: 10 }}>th</Text> May,
                    2024
                  </Text>
                  <Text>2 PM onwards</Text>
                </View>
              </View>

              <View row marginB-12>
                <RHA.Icons.LocationPin fill={Colors.grey_2} width={16} />
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

        <Text
          style={{
            marginVertical: 20,
            fontSize: 16,
            color: Colors.grey_2,
            textTransform: 'uppercase',
            textAlign: 'center',
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
