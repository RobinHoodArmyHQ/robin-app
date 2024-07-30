import React from 'react';
import MapView from 'react-native-maps';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import type { Post } from '@/api';

import { Icons } from '../icons';

type Props = Post;

export const Card = ({}: Props) => {
  return (
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
            <Icons.Calendar fill={Colors.grey_2} width={16} height={28} />
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
