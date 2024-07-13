/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import type { PickerItemProps } from 'react-native-ui-lib';
import {
  Colors,
  Picker,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import RHA from '@/components';

const cities: PickerItemProps[] = [
  { value: 1, label: 'Gurgaon' },
  { value: 2, label: 'New Delhi' },
  { value: 3, label: 'Mumbai' },
  { value: 4, label: 'Bangalore' },
  { value: 5, label: 'Chennai' },
  { value: 6, label: 'Kolkata' },
  { value: 7, label: 'Hyderabad' },
  { value: 8, label: 'Pune' },
  { value: 9, label: 'Ahmedabad' },
  { value: 10, label: 'Jaipur' },
  { value: 11, label: 'Lucknow' },
  { value: 12, label: 'Surat' },
  { value: 13, label: 'Kanpur' },
  { value: 14, label: 'Nagpur' },
  { value: 15, label: 'Indore' },
  { value: 16, label: 'Thane' },
  { value: 17, label: 'Bhopal' },
  { value: 18, label: 'Visakhapatnam' },
  { value: 19, label: 'Patna' },
  { value: 20, label: 'Vadodara' },
];

export default function Feed() {
  const initialState = {
    selectedCity: undefined,
  };
  const [state, setState] = useState(initialState);

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
      {/* <FocusAwareStatusBar /> */}

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
            placeholder="Select City"
            value={state.selectedCity}
            items={cities}
            onChange={(selectedCity) =>
              setState({ ...state, selectedCity: selectedCity })
            }
            style={{
              fontSize: 16,
              lineHeight: 32,
              height: 32,
              color: Colors.white,
            }}
            containerStyle={{}}
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
              <RHA.Icons.DownArrow
                fill={Colors.white}
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

      <RHA.Type.H1
        marginH-20
        style={{ fontFamily: 'Poppins_600SemiBold', letterSpacing: -0.7 }}
      >
        Welcome Robin!
      </RHA.Type.H1>

      <TouchableOpacity
        activeOpacity={0.9}
        throttleTime={250}
        activeScale={0.98}
        activeBackgroundColor={Colors.grey1}
        style={{
          marginHorizontal: 20,
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
              <RHA.Icons.Calendar fill={Colors.grey_2} width={16} height={28} />
              <View marginL-8>
                <Text
                  column
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                  }}
                >
                  Saturday, 4<Text style={{ fontSize: 10 }}>th</Text> May, 2024
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
