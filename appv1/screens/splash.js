import React, { Component } from 'react';
import {
  
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Button,
  Body,
  Right,
  Thumbnail,
  Text,

} from 'native-base';
import {NetInfo, ActivityIndicator,View,FlatList, TouchableOpacity,AsyncStorage } from 'react-native';
import firebase from 'firebase';
import OfflineNotice from './offlineNotice';
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
export default class Splash extends Component {
  // Initialize Firebase

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: '',
      showSpinner:true,
      isConnected:true
    };
  }
  componentDidMount() {
      this.props.navigation.addListener('willFocus', (playload)=>{
        NetInfo.isConnected.addEventListener('connectionChange', ()=>{
          alert('hello');
          if (this.state.isConnected) {
            this.setState({ isConnected:!isConnected });
            alert('hello');
          } else {
            this.setState({ isConnected:!isConnected });
            alert('hello');
          }
        });
        let items = [];
        firebase
          .database()
          .ref('/users1')
          .on('value', snapshot => {
            //let count = JSON.stringify(snapshot)
            //for (let i in JSON.parse(count)){
            //console.log(i);
            //alert('hello1');
            this.setState({showSpinner:true});
            snapshot.forEach(child => {
              items.push(child);
    
            });
            this.setState({ tasks: items });  
            this.setState({showSpinner:false});
          });
      });
    }
  // alertkr(value){
  //   alert(value)
  // }
  
  async _storeData(value){
    try {
      await AsyncStorage.setItem('user', value).then(()=>{
        this.props.navigation.navigate('AddUser');     
      });
    } catch (error) {
      // Error saving data
    }
  }

  render() {
    t=this.props.navigation;
    return (
      <Container>
        
        <Header >

        <Right>
          <Button transparent
          onPress={()=>{
            AsyncStorage.removeItem('userVal');
            t.navigate('Splash');
          }}
          >
          <Text>Log Out</Text>
          </Button>
        </Right>
        </Header>
        <Content>
        <OfflineNotice/>
        <View><ActivityIndicator size="large" color="#0000ff" animating={this.state.showSpinner}/></View>
          <FlatList
            data={this.state.tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={require('../assets/avatar.png')}
                  />
                </Left>
                <Body>
                  <Text>{item.key}</Text>
                  <Text note>Name {JSON.stringify(item.val().name)}</Text>
                  <Text note>Number {JSON.stringify(item.val().number)}</Text>
                </Body>
                <Right>
                    <TouchableOpacity >
                    <Button primary
                    onPress={()=>{this._storeData(item.key)
                    }}
                    >
                      <Text>Add</Text>
                    </Button>
                </TouchableOpacity>  
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}