import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';
  import { Container, Header, Icon,Content, Form, Item, Input, Label,Button,Body,Title,Left,Text } from 'native-base';
  
  export default class Login extends Component{
constructor(props){
    super(props);
    this.state={
        email:'',
        password:''
    }
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
}
// handleLogin(){

// }

render(){
  t=this.props.navigation;
    return(
        <Container style={styles.container}>
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
            source={require('../assets/back5.jpg')}
          />
</View>
            <View
            style={{marginTop:'20%'}}
            />
       <Image
        style={{height:150,width:150}}
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

          </Form>
          <Button block primary style={{marginTop:10}}
          onPress={
            ()=>{
              if(this.state.email==='owais'&&this.state.password==='12345'&&this.state.email!==''&&this.state.password!==''){
                try {
                  AsyncStorage.setItem('userVal', JSON.stringify({logged:'true'})).then(()=>{
                      
                 });
               } catch (error) {
                 
             }  
                t.navigate('Dashboard')
          }
          if(this.state.email==='awais'&&this.state.password==='12345'&&this.state.email!==''&&this.state.password!==''){
            try {
               AsyncStorage.setItem('userVal', JSON.stringify({logged:'true'})).then(()=>{
                   
              });
            } catch (error) {
              
          }
          t.navigate('Dashboard');  
          }}}
          >
            <Text>Login</Text>
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