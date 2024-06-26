import Constants from 'expo-constants';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import type {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

export default function LocationPicker() {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 28.443937, // TODO: should be user's current location
    longitude: 77.0854834,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
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
    setSelectedLocation({ ...selectedLocation, latitude: lat, longitude: lng });
  };

  const onSaveLocation = () => {
    router.navigate({
      pathname: '/event/create',
      params: {
        event_location:
          selectedLocation.latitude + ',' + selectedLocation.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={onPlaceSelected}
        query={{
          key: Constants.expoConfig?.android?.config?.googleMaps?.apiKey,
          language: 'en',
        }}
        fetchDetails
        styles={{ container: { flex: 0 } }}
      />
      <MapView
        style={styles.container}
        region={selectedLocation}
        onPress={(e) =>
          setSelectedLocation({
            ...selectedLocation,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button title="Save Location" onPress={onSaveLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
