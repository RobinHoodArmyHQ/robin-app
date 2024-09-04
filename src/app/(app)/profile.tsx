import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
        <Image
        source={require('C:/Users/91639/Desktop/my-app/assets/images/white-arrow-png-41944.png')}
        style={styles.arrowIcon}/>
        

        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' }} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ayan</Text>
        <Text style={styles.position}>Cadet</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Food drives</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Academic drives</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>46</Text>
            <Text style={styles.statLabel}>Lives touched</Text>
          </View>
        </View>
      </View>
      <View style={styles.menu}>
        <MenuItem title="Edit Profile" />
        <MenuItem title="My Drives" />
        <MenuItem title="Change Password" />
        <MenuItem title="Logout" />
      </View>
    </ScrollView>
  );
};


type MenuItemProps = {
  title: string;
};

const MenuItem = ({ title }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#006229',
   // paddingVertical: 20,
    //paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    
  },
  backButton: {
    marginRight: 10,
    

  },
  arrowIcon: {
    width:20,
    height:20,

  },


  

  profileText: {
    color: '#fff',
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    marginRight: 30, 
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    padding:40
    
    // Adjust as needed to center the text properly
  
  },

  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  menu: {
    marginTop: 30,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:50
  },
  menuItemText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ProfileScreen;