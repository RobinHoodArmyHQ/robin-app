import Constants from 'expo-constants';
import { router, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native-ui-lib';

import RHA from '@/components';

// eslint-disable-next-line max-lines-per-function
export default function LocationPicker() {
  const mapViewRef = useRef<MapView>(null);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 28.443937, // TODO: should be user's current location
    longitude: 77.0854834,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
    name: '',
  });

  useEffect(() => {}, [selectedLocation]);

  const onPlaceSelected = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details == null) {
      console.log('received null data');
      return;
    }

    const { lat, lng } = details.geometry.location;
    setMapLocation(lat, lng, details.name + ', ' + details.formatted_address);
  };

  const onSaveLocation = () => {
    const event_location_param = JSON.stringify({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      name: selectedLocation.name,
    });
    router.navigate({
      pathname: '/event/create',
      params: {
        event_location_param: event_location_param,
      },
    });
  };

  const setMapLocation = (
    latitude: number,
    longitude: number,
    name: string
  ) => {
    setSelectedLocation({
      ...selectedLocation,
      latitude: latitude,
      longitude: longitude,
      name: name,
    });

    mapViewRef?.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
      zoom: 15,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Select Location',
        }}
      />
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          //          currentLocation
          debounce={250}
          onPress={onPlaceSelected}
          query={{
            key: Constants.expoConfig?.android?.config?.googleMaps?.apiKey,
            language: 'en',
          }}
          fetchDetails
          styles={styles.searchInput}
        />
        <MapView
          style={styles.mapView}
          initialRegion={selectedLocation}
          loadingEnabled={true}
          pitchEnabled={false}
          mapPadding={{ top: 0, right: 0, bottom: 80, left: 20 }}
          ref={mapViewRef}
          onPress={(e) =>
            setMapLocation(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
              ''
            )
          }
          onMarkerDragEnd={(e) =>
            setMapLocation(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
              ''
            )
          }
          onPoiClick={(e) =>
            setMapLocation(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
              ''
            )
          }
        >
          {selectedLocation && (
            <Marker draggable coordinate={selectedLocation} />
          )}
        </MapView>
        <RHA.Form.Button
          label="Save Location"
          style={styles.saveButton}
          onPress={onSaveLocation}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    container: {
      flex: 0,
      position: 'absolute',
      margin: 16,
      zIndex: 10,
      left: 0,
      right: 0,
    },
    textInput: {
      borderWidth: 1,
      borderColor: Colors.grey_2,
      height: 48,
      elevation: 10,
    },
    listView: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.grey_2,
      elevation: 10,
    },
  },
  mapView: {
    flexGrow: 1,
    alignSelf: 'stretch',
  },
  saveButton: {
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
