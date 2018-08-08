/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import Splash from './screens/splash'
import Login from './screens/login'
import Dashboard from './screens/addUser'
import {createStackNavigator} from 'react-navigation'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const Rootnavigation=createStackNavigator({
  Splash:{
    screen:Login,
    navigationOptions:{
      header:null
    }
  },
  Dashboard:{
    screen:Splash,
    navigationOptions:{
      header:null
    }
  },
  AddUser:{
    screen:Dashboard,
    
  },  
});
const Rootnavigation1=createStackNavigator({
  Dashboard:{
    screen:Splash,
    navigationOptions:{
      header:null
    },
  },
  Splash:{
    screen:Login,
    navigationOptions:{
      header:null
    }
  },
  AddUser:{
    screen:Dashboard,
   
  },  
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      logged:'false'
    }
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
  }
  async _retrieveData() {
    try {
      const value = await AsyncStorage.getItem('userVal',(error,data)=>{
        if(data){
          this.setState({logged:'true'});
        }
        else{
          this.setState({logged:'false'});
        }
      });
     
     } catch (error) {
       // Error retrieving data 
      }
  }
componentDidMount(){
  this._retrieveData();
}
    render() {
    if(this.state.logged==='true'){
        return (
          <Rootnavigation1/>
        );      
      }
      else{
        return (
          <Rootnavigation/>
              );
      }
     } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});