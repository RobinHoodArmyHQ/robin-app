import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfileScreen = () => {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('janedoe@gmail.com');
  const [phone, setPhone] = useState('+91 XXXXX XXXXX');

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.profileImage}>
      <Image
          source={require('C:/Users/91639/Desktop/robin-app/assets/icon.png')}
           style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>+</Text>
        </TouchableOpacity>
      </View>
     
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}></Text> */}
          <TextInput
            value={name}
            placeholder='Name'
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}></Text> */}
          <TextInput
            value={email}
            placeholder='Email'
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}></Text> */}
          <TextInput
            value={phone}
            placeholder='+91 XXXXX XXXXX'
            onChangeText={setPhone}
            style={styles.input}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
        <Image
          source={{ uri: 'https://img.icons8.com/material-outlined/24/home--v2.png' }} // Replace with your image URL
          style={styles.footerButton}
        />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
        <Image
          source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/instagram-reels-icon.png' }} // Replace with your image URL
          style={styles.footerButton}
        />
          <Text style={styles.footerButtonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
        <Image
          source={{ uri: 'https://w7.pngwing.com/pngs/442/579/png-transparent-yellow-trophy-material-design-polymer-mobile-app-android-leaderboard-hd-icon-miscellaneous-user-interface-design-logo-thumbnail.png' }} // Replace with your image URL
          style={styles.footerButton}
        />
          <Text style={styles.footerButtonText}>Leader Board</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfvl8FFCBmq28XS731Nd-apOC_LlBOOBTqw&s' }} // Replace with your image URL
          style={styles.footerButton}
        />
          <Text style={styles.footerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  header: {
    backgroundColor: '#00622E',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 30,
  
   
  },
  profileImage: {
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    height: 120,
    width: 120,
    borderRadius: 60,
    left: 70,  
  },
  Image: {
    // objectFit: 'fill',
    height: 120,
    width: 120,
    borderRadius: 60,
    left: 70,  
  },
  editButton: {
    position: 'absolute',
    height: 36,
    width: 36,
    borderRadius: 18,
    bottom: -15,
    left: 155,
    backgroundColor: '#00622E',
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    
    // borderRadius: 5,
    
  },
  form: {
    padding: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
   
  },
  saveButton: {
    backgroundColor: '#00622E',
    padding: 25,
    top: 70,
    margin: 50,
    borderRadius: 15,    
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 90,
    padding: 10,
  },
  footerButton: {
    padding: 13,
  },
  footerImage: {
    color:'#ccc',
    width: 24,
    height: 24,
  },

  footerButtonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default EditProfileScreen;