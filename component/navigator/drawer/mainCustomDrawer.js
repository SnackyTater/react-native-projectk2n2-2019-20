import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, AsyncStorage, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class subDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentProfile: '#9d65f7',
      studentResult: '#fff',
      studentSchedule: '#fff',
      studentSchoolSchedule: '#fff',
      teacherProfile: '#9d65f7',
      teacherResult: '#fff',
      teacherSchedule: '#fff',
      teacherSchoolSchedule: '#fff',
      role: ''
    }
  }

  componentDidMount(){
    let loop = setInterval(() => {
      AsyncStorage.getItem('user').then((preData) => {
        if(preData !== null){
          const postData = JSON.parse(preData);
          this.setState({
            role: postData.user.role,
          })
        }
      })
    },500)
    
    console.log(this.state.role)
  }

  Logout() {
    AsyncStorage.removeItem('user').then(() => {
        this.props.navigation.navigate('Login');
    }).catch((err) => {console.log('')});
  }

  resetColor(){
    this.setState({
      studentProfile: '#fff',
      studentResult: '#fff',
      studentSchedule: '#fff',
      studentSchoolSchedule: '#fff'
    })
  }

  render () {
    if(this.state.role == 'sv'){
      return (
        <View const style = {styles.container}>
          <View style = {styles.header}>
            <View style={styles.imageContainer}>
              <Image style = {styles.img} source={require('../../../assets/LogoTLU.jpg')}/>
            </View>
          </View>
          <ScrollView style={{top: 20}}>
            <View style={{backgroundColor: this.state.studentProfile, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                    this.props.navigation.navigate('studentProfile');
                    this.resetColor();
                    this.setState({studentProfile: '#9d65f7'});
                  }}>
                <Text style={styles.navText}>Thông tin cá nhân</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentResult, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('studentResult')
                  this.resetColor();
                  this.setState({studentResult: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Bảng điểm</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentSchedule, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('studentSchedule')
                  this.resetColor();
                  this.setState({studentSchedule: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Thời khóa biểu</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentSchoolSchedule, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('studentSchoolSchedule')
                  this.resetColor();
                  this.setState({studentSchoolSchedule: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Thời khóa biểu toàn trường</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {this.Logout()}}>
                <Text style={styles.navText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
    else {
      return(
        <View const style = {styles.container}>
          <View style = {styles.header}>
            <View style={styles.imageContainer}>
            <Image style = {styles.img} source={require('../../../assets/LogoTLU.jpg')}/>
            </View>
          </View>
          <ScrollView style={{top: 20}}>
            <View style={{backgroundColor: this.state.studentProfile, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                    this.props.navigation.navigate('teacherProfile');
                    this.resetColor();
                    this.setState({teacherProfile: '#9d65f7'});
                  }}>
                <Text style={styles.navText}>Thông tin cá nhân</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentResult, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('teacherResult')
                  this.resetColor();
                  this.setState({teacherResult: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Bảng điểm</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentSchedule, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('teacherSchedule')
                  this.resetColor();
                  this.setState({teacherSchedule: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Lịch dạy</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: this.state.studentSchoolSchedule, padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  this.props.navigation.navigate('teacherSchoolSchedule')
                  this.resetColor();
                  this.setState({teacherSchoolSchedule: '#9d65f7'});
                }}>
                <Text style={styles.navText}>Thời khóa biểu toàn trường</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity style = {styles.navItemStyle} onPress={() => {this.Logout()}}>
                <Text style={styles.navText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    top: 25,
    left: 75
  },
  img: {
    flex:1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: '#fff',
    padding: 10,
    elevation: 2
  },
  navText: {
    fontSize: 20
  }
});

