import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, Image, Text, View } from 'react-native-ui-lib';

export default function CheckinScreen() {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      exif: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      orderedSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
      exif: true,
    });

    console.log(result);
    console.log(result.assets?.[0].exif);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Check In',
        }}
      />

      <View
        padding-20
        style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey_1 }}
      >
        <Text style={{ color: Colors.grey_2, fontSize: 14 }} marginB-8>
          CHECKING IN FOR EVENT
        </Text>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>
          Friday Food Drive
        </Text>
        <Text style={{}}>Saturday, 4th May, 2024, 2:00 PM Onwards</Text>
      </View>

      <View style={styles.container}>
        <Button label="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button label="Capture an Image" onPress={captureImage} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
