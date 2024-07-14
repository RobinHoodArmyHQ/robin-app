/* eslint-disable max-lines-per-function */
import * as ImagePicker from 'expo-image-picker';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Colors,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import RHA from '@/components';

export default function CheckinScreen() {
  const [checkinImages, setCheckinImages] = useState<string[]>([]);

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
      setCheckinImages([...checkinImages, result.assets[0].uri]);
      hideDialog();
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
      setCheckinImages([...checkinImages, result.assets[0].uri]);
      hideDialog();
    }
  };

  const [isDialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Check In',
        }}
      />

      <Incubator.Dialog
        bottom
        visible={isDialogVisible}
        onDismiss={hideDialog}
        headerProps={{ title: '', showDivider: false }}
        width={'100%'}
        containerStyle={{ marginBottom: -4 }}
      >
        <View
          style={{
            padding: 20,
            marginVertical: 20,
            backgroundColor: Colors.white,
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={{
              borderBottomColor: Colors.grey_1,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 56 }}>
              Pick from photo gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={captureImage}>
            <Text style={{ fontSize: 16, lineHeight: 56 }}>
              Capture using Camera
            </Text>
          </TouchableOpacity>
        </View>
      </Incubator.Dialog>

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

      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>
          Upload pictures from the drive
        </Text>
        <ScrollView
          horizontal
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            paddingBottom: 10,
          }}
        >
          {checkinImages.map((image, idx) => (
            <Image
              style={styles.imageListItem}
              source={{ uri: image }}
              key={idx}
            />
          ))}
          <TouchableOpacity style={styles.addImageButton} onPress={showDialog}>
            <Text
              style={{ fontSize: 32, color: Colors.grey_2, paddingBottom: 2 }}
            >
              +
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <RHA.Form.Input
          placeholder="Caption"
          multiline
          value={'this is some \n test text'}
        />
      </ScrollView>
      <RHA.Form.Button
        margin-20
        label="Submit"
        onPress={() => router.replace('/event/checkin-success')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  imageListItem: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: Colors.grey_1,
    borderColor: Colors.grey_2,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    backgroundColor: Colors.grey_1,
    borderColor: Colors.grey_2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
