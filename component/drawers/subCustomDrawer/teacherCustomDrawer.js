import React, {Component} from 'react';
import {ScrollView, Text, View, AsyncStorage, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class StudentDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherProfile: '#9d65f7',
      teacherResult: '#fff',
      teacherSchedule: '#fff',
      teacherSchoolSchedule: '#fff',
    }
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
    return (
      <View const style = {styles.container}>
        <View style = {styles.header}>
          <View style={styles.imageContainer}>
            <Image style = {styles.img} source={require('../../../../assets/LogoTLU.jpg')}/>
          </View>
        </View>
        <ScrollView style={{top: 20}}>
          <View style={{backgroundColor: this.state.studentProfile, padding: 10}}>
            <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                  navigation.navigate('studentProfile');
                  this.resetColor();
                  this.setState({studentProfile: '#9d65f7'});
                }}>
              <Text style={styles.navText}>Thông tin cá nhân</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: this.state.studentResult, padding: 10}}>
            <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                navigation.navigate('studentResult')
                this.resetColor();
                this.setState({studentResult: '#9d65f7'});
              }}>
              <Text style={styles.navText}>Bảng điểm</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: this.state.studentSchedule, padding: 10}}>
            <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                navigation.navigate('studentSchedule')
                this.resetColor();
                this.setState({studentSchedule: '#9d65f7'});
              }}>
              <Text style={styles.navText}>Thời khóa biểu</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: this.state.studentSchoolSchedule, padding: 10}}>
            <TouchableOpacity style = {styles.navItemStyle} onPress={() => {
                navigation.navigate('studentSchoolSchedule')
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