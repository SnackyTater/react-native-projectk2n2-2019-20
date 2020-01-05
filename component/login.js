import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';


export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      }
    }

    componentDidMount() {
      this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      var value = await AsyncStorage.getItem('user');
      if(value !== null){
        this.props.navigation.navigate('Profile');
      }  
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
        let flag = data.hasOwnProperty('message');

        if(flag){
          if(data.message == 'not_existed'){
            alert('Tài khoản không tồn tại');
          }
          if(data.message == 'password_wrong'){
            alert('Sai mật khẩu');
          }
        }else {
            if(data.user.username == this.state.username) {
              AsyncStorage.setItem('user', JSON.stringify(data)).catch((err) => {console.log('')});
              this.props.navigation.navigate('Profile');
            }
        }
      }).done();
    }

  render() {  
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.containter}>
          <Text style={styles.header}>Đăng nhập</Text>

          <TextInput 
            style={styles.textInput} 
            placeholder='Username'
            onChange={(userName) => {this.setState({username: userName.nativeEvent.text})}}
          />

          <TextInput 
            style={styles.textInput} 
            placeholder='Password'
            onChange={(passWord) => {this.setState({password: passWord.nativeEvent.text})}}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.login()}}
          >
            <Text>Log in</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  wrapper:{
    flex: 1
  },
  containter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9152f8',
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#9152f8',
    color: 'white'
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  }
});
