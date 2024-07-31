import React, { useState }  from 'react'; 
import { View , TouchableOpacity , Text , Image , StyleSheet , TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


const changepassword = () => {
  const [oldpassword , Setpassword] = useState('');
  const [newpassword , Setnewpassword] = useState('');
  const [confirmpassword , Setconfirmpassword] = useState('');
  const [SecureTextEntry,SetSecureTextEntry] = useState(true);
  
  const toggleSecureTextEntry = () => {
    SetSecureTextEntry(!SecureTextEntry);
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Change Password</Text>
      </View>
    
    <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="lock"
          size={20}
          color="#000" />
          
          <TextInput
            value={oldpassword}
            placeholder='Old Password'
            onChangeText={Setpassword}
            secureTextEntry={SecureTextEntry}
            style={styles.input}
          />
          
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <Icon name="lock" 
                size={20} 
                color="#000" />
        </View>
          <TextInput
            value={newpassword}
            placeholder='New Pssword'
            onChangeText={Setnewpassword}
            secureTextEntry={SecureTextEntry}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.showHideButton}>
            <Text style={styles.showHideText}>
              {SecureTextEntry ? 'Show':'Hide'}
            </Text>

          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}></Text> */}
          <View style={styles.iconContainer}>
          <Icon name="lock"
           size={20} 
           color="#000" />
        </View>
          <TextInput
            value={confirmpassword}
            placeholder='Confirm Password'
            onChangeText={Setconfirmpassword}
            secureTextEntry={SecureTextEntry}
            style={styles.input}
          />
          
         
          
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <View style={styles.innerContaier}>
        <Text style={styles.saveButtonText}>Save</Text>
        <Image
        source={require('C:/Users/91639/Desktop/class001/assets/white-arrow-png-41944.png')}
        style={styles.arrowIcon}/>
        </View>
      </TouchableOpacity>
      </View>


  )
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 280,
    
  },

  header: {
    
    backgroundColor: '#00622E',
    padding:20,
    
    
  },

  title: {
    fontSize: 30,
    textAlign:'center',
    paddingTop:30,
    color:'#fff'
    
  },

  form: {
    padding:40,

  },

  inputContainer: {

    flexDirection:'row',
    paddingVertical:15,  
    alignItems:'center',
    verticalAlign:'middle',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  iconContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    verticalAlign:'middle'

  },

  Icon: {
    width: 5,
    paddingLeft: 10,
  },

  label: {
    fontSize:16,
    marginBottom:20,
    paddingBottom:20
  },

  input: {
    borderWidth:0,
    borderColor:'#ccc',
    padding:20,
    borderRadius:5

  },

  showHideButton: {
   padding:10,
   paddingLeft:120
  },

  

  showHideText: {
    color: '#979797',
    fontWeight: 'bold',
    
  },

  saveButton: {
    backgroundColor:'#00622E',
    padding:25 ,
    top:70,
    borderRadius:15 ,
    margin:60

  },

  innerContaier : { 
    flexDirection: 'row',
    alignItems: 'center'

  },

  saveButtonText: {
    color:'#fff' , 
    fontSize: 18,
    fontWeight:'bold' ,
    textAlign: 'center',
    flex: 1
  },

  arrowIcon: {
    width: 20,
    height: 20,
  },

  

  

  



});

export default changepassword