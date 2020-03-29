import React from 'react';
import {Text, View, TextInput, TouchableOpacity, AsyncStorage, Image} from 'react-native';

import {login} from '../../../../controller/fetcher/loginController';
import styles from './style'

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
      // this.loadInitialState().done();
    }

    loadInitialState = async () => {
      await AsyncStorage.getItem('user').then((value) => {
        if(value !== null){
          if(value.user.role == 'sv'){
            this.props.navigation.navigate('studentProfile');
          }
          if(value.user.role == 'gv'){
            this.props.navigation.navigate('teacherProfile');
          }
        }
      })
    }


    async loginHandler() {
      await login(this.state.username, this.state.password).then((data) => {
        if(data.hasOwnProperty('message')){
          if(data.message == 'not_existed'){
            alert('Tài khoản không tồn tại');
          }
          if(data.message == 'password_wrong'){
            alert('Sai mật khẩu');
          }
        } else {
              AsyncStorage.setItem('user', JSON.stringify(data)).catch((err) => {console.log('')});

              if(data.user.role == 'sv'){
                this.props.navigation.navigate('studentProfile');
              }
              if(data.user.role == 'gv'){
                this.props.navigation.navigate('teacherProfile');
              }
        }
      }).catch((err) => {console.log(err)})
    }

  render() {  
    return (
        <View style={styles.container}>
          <View style = {styles.header}>
            <View style={styles.imageContainer}>
              <Image style = {styles.img} source={require('../../../../assets/LogoTLU.jpg')}/>
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

            <TouchableOpacity style={styles.button}onPress={() => {this.loginHandler()}}>
              <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}