import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source="" />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Software Engineer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
