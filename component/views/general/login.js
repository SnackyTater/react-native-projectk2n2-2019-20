import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Image, Dimensions } from 'react-native';
import { createLoginSession } from '../../../utils/utility';


export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        usernameFocus: false,
        passwordFocus: false
      }
    }

    componentDidMount() {
      this.loadInitialState().done();
    }

    loadInitialState = async () => {
      await AsyncStorage.getItem('user').then((value) => {
        if(value !== null){
          this.props.navigation.navigate('Profile');
        }
      })
    }

    login() {
      fetch('https://dangkyhoctlu.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      }).then((res) => res.json()).then((data) => {
        console.log(data);
        let flag = data.hasOwnProperty('message');

        if(flag){
          if(data.message == 'not_existed'){
            alert('Tài khoản không tồn tại');
          }
          if(data.message == 'password_wrong'){
            alert('Sai mật khẩu');
          }
        }else {
            if((data.user.username == this.state.username.toUpperCase()) || (data.user.username == this.state.username)) {

              AsyncStorage.setItem('user', JSON.stringify(data)).catch((err) => {console.log('')});
              createLoginSession();

              if(data.user.role == 'sv'){
                this.props.navigation.navigate('studentProfile');
              }
              if(data.user.role == 'gv'){
                this.props.navigation.navigate('teacherProfile');
              }
            }
        }
      }).done();
    }

  render() {  
    return (
        <View style={styles.container}>
          <View style = {styles.header}>
            <View style={styles.imageContainer}>
              <Image style = {styles.img} source={require('../../../assets/LogoTLU.jpg')}/>
            </View>
          </View>
          <View style = {styles.body}>
            <View>
              <Text style={styles.text}>Đăng nhập</Text>
            </View>

            <TextInput 
              style={(this.state.usernameFocus) ? styles.textInputOnFocus : styles.textInputOnBlur}
              placeholder='Username' 
              onChange={(userName) => {this.setState({username: userName.nativeEvent.text})}} 
              onFocus={() => {this.setState({usernameFocus: true})}}
              onBlur={() => {this.setState({usernameFocus: false})}}
              value={this.state.username}
            />

            <TextInput 
              style={(this.state.passwordFocus) ? styles.textInputOnFocus : styles.textInputOnBlur} 
              placeholder='Password'
              onChange={(passWord) => {this.setState({password: passWord.nativeEvent.text})}}
              onFocus={() => {this.setState({passwordFocus: true})}}
              onBlur={() => {this.setState({passwordFocus: false})}}
              secureTextEntry={true}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.button}onPress={() => {this.login()}}>
              <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1
  },
  container: {
    flex: 1
  },
  header: {
    height: 200,
    backgroundColor: '#9152f8',
    position: 'relative'
  },
  imageContainer:{
    position: 'absolute',
    flex: 1,
    overflow: 'hidden',
    height: 150,
    width: 150,
    borderRadius: 150/2,
    alignSelf: 'center',
    bottom: '5%'
  },
  img: {
    flex:1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9152f8',
    paddingLeft: 40,
    paddingRight: 40
  },
  text: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold'
  },
  textInputOnBlur: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#9152f8',
    color: 'white',
    borderColor: '#d6d7da',
    borderWidth: 0.5,
    borderRadius: 50
  },
  textInputOnFocus: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#d6d7da',
    borderWidth: 0.5,
    borderRadius: 50
  },
  button: {
    width: 150,
    backgroundColor: 'white',
    top: 50,
    padding: 20,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center'
  },
});
