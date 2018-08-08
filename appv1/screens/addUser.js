import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    BackHandler,
    BackAndroid,
    YellowBox
  } from 'react-native';
  import { Container, Header, Icon,Content, Subtitle,Form, Item, Input,Right, Label,Button,Body,Title,Left,Text } from 'native-base';
 import firebase from 'firebase';
  var config = {
  apiKey: 'AIzaSyBFYLgzaEjpfqzHA-rM7l0vlu-wbFs08qc',
  authDomain: 'paksecurity-fee60.firebaseapp.com',
  databaseURL: 'https://paksecurity-fee60.firebaseio.com',
  projectId: 'paksecurity-fee60',
  storageBucket: 'paksecurity-fee60.appspot.com',
  messagingSenderId: '826090929665',
};
try {
  firebase.initializeApp(config);
} catch (e) {
  console.log('App reloaded, so firebase did not re-initialize');
}
  export default class Login extends Component{
constructor(props){
    super(props);
    this.state={
        user:'',
        email:'',
        password:'',
        number:''
    }
    console.ignoredYellowBox = [
      'Setting a timer',
      'isMounted(...) is Deprecated in plain JavaScript React classes'
      ];
      YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
this._retrieveData=this._retrieveData.bind(this);
//this.handleBackPress = this.handleBackPress.bind(this);
}
async _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      // We have data!!
      this.setState({user:value});
    }
   } catch (error) {
     // Error retrieving data
     alert(error)
   }
}
componentDidMount(){
  // BackAndroid.addEventListener('hardwareButtonPress', () => {
  //   this.props.navigation.navigate('Splash'); // works best when the goBack is async
  //   return true;
  // });
this._retrieveData();
}


render(){
    t=this.props.navigation;
    return(
            <Container style={styles.container}>
            <View><Text>Hello world</Text></View>      
<View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,

            }}
            source={require('../assets/back5.jpg')}/>
</View>
            <View
            style={{marginTop:'20%'}}
            />
       <Image
        style={{height:100,width:100}}
        source={require('../assets/logo.png')}
       /> 
       <Text style={styles.signuptext}>PaKSecurity Consultants</Text>    
        <Content style={{width:'90%'}}>
          <Form >
          <Item rounded style={{marginTop:10}}>
            
          <Input placeholder='Name' style={styles.input} placeholderTextColor='white'
          onChangeText={(e)=>{this.setState({email:e})}}
          />
        </Item>
            <Item rounded style={{marginTop:10}}>
            <Input placeholder='Password' placeholderTextColor='white' style={styles.input}
            onChangeText={(e)=>{this.setState({password:e})}
              
          }
          secureTextEntry
            />
          </Item>
          <Item rounded style={{marginTop:10}}>
            <Input placeholder='Number' placeholderTextColor='white' style={styles.input}
            onChangeText={(e)=>{this.setState({number:e})}
              
          }
          keyboardType='numeric'
            />
          </Item>
          </Form>
          <Button block primary style={{marginTop:10}}
          onPress={
            ()=>{
              if(this.state.name!==''&&this.state.password!==''&&this.state.number!==''){
              firebase.database().ref('users1/'+this.state.user).set({
    name: this.state.email,
    password: this.state.password,
    number : this.state.number
  }, function(error) {
    if (error) {
      alert(error)
    } else {
      // Data saved successfully!
      alert('update successful');
      t.navigate('Dashboard');
    }
  });
}
else{
  alert('Some fields are empty')
}
}
          }
          >
            <Text>Update</Text>
          </Button>
          <Button block danger style={{marginTop:10}}
          onPress={
            ()=>{
              firebase.database().ref('users1/'+this.state.user).remove(function(error) {
    if (error) {
      alert(error)
    } else {
      // Data saved successfully!
      alert('Delete successfull');
      t.navigate('Dashboard');
    }
  });
}
          }
          >
          <Text>Delete</Text>
          </Button>
          
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signuptext: {
    margin: 15
    ,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  input:{
    color:'white'
  }
});