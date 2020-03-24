import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {Header, Left, Icon} from 'native-base';

import TableSchedule from '../general/tableSchedule';

import Loading from '../general/loading';
import {getTimeNow, getCurrentSemesterAndYear} from '../../../utils/utility';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            studentGroup: 0,
            semester: 0,
            schoolYear: '',

            //subject list
            subjectList: [],
            //classes list
            selectedSubject: null,
            selectedSubjectClasses: null,
            //schedule
            list: [],
            scheduleTracker: [],
            
            loading: true,
            
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            let postData = JSON.parse(preData);
            let currentSemesterAndYear = getCurrentSemesterAndYear(getTimeNow());
            let holder = []
            for(let i = 0; i < 7; i++){
                holder.push([null, null, null, null, null, null, null, null, null, null,])
            }
            this.setState({
                userData: postData,
                semester: currentSemesterAndYear.currentSemester,
                schoolYear: currentSemesterAndYear.currentYear,
                scheduleTracker: holder
            })
            this.getRegistrationEvent()
        }).catch((err) => {console.log(err)}); 
    }

    getScheduleData(){
        let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + this.state.userData.user.info._id + '/semester/'+ this.state.semester +'/year/'+ this.state.schoolYear +'?active=true';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.userData.token,
            }
        }).then((res) => res.json()).then((data) => {
            
            let flag = data === null 
            if(flag){
                this.setState({
                    list: [],
                    loading: false
                })
            } else {
                this.setState({
                    list: data.list,
                    loading: false
                });
                this.trackerHandler(data.list)
            }
        }).done();
    }

    trackerHandler(schedule){
        let holder = this.state.scheduleTracker
        schedule.forEach((item) => {
            let sth = this.state.scheduleTracker[item.dayOfWeek]
            let from = item.from.name-1;
            let to = item.to.name;
            for (let i = from; i < to; i ++){
                sth[i] = item._id
            }
            holder[item.dayOfWeek] = sth
        })
        this.setState({
            scheduleTracker: holder
        })
    }

    getRegistrationEvent(){
        let url = 'https://dangkyhoctlu.herokuapp.com/api/registration-event/subjects';
        fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.state.userData.token
            },
            body: JSON.stringify({
              _id: this.state.userData.user._id,
              info: this.state.userData.user.info
            })
        }).then((res) => res.json()).then((data) => {
            (data.message) ? (
                this.setState({
                    loading: false
                }),
                alert(data.message)
            ) : (
                this.setState({
                    subjectList: data.subjectList,
                }),
                this.getScheduleData()
            )
        }).done();
    }

    toggleRegister(lessons){
        let userData = this.state.userData
        let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userData.user.info._id +'/semester/' + this.state.semester +'/year/' + this.state.schoolYear + '/toggle-register';
        fetch(url, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userData.token
            },
            body: JSON.stringify({
              lesson: lessons,
              subject: this.state.selectedSubject
            })
        }).then((res) => res.json()).then((data) => {
            this.studentCounter(lessons, data.list)
            this.getScheduleData()
        }).done();
    }

    studentCounter(lessons, list){
        let counter = 1;
        let length = lessons.length
        let holder = lessons.map((lesson) => {
            let flag = list.includes(lesson._id)
            let holder = lesson
            if(flag){
                lesson.count+=1;
            } else {
                if (counter == length){
                    if(lesson.count > 0){
                        lesson.count-=1;
                    }
                }
            }
            counter++;
            return holder
        })
        let holder2 = [];
        holder2.push(holder)
        this.setState({
            selectedSubjectClasses: holder2
        })
    }

    classSelecterHandler(lesson){
        let holder = this.state.scheduleTracker

        //check if dayOfWeek & class is empty (true = not empty)
        let stage1 = lesson.map((item) => {
            let sth = holder[item.dayOfWeek];
            let flag = false;
            for(let i = item.from.name; i< item.to.name; i++){
                if(sth[i] != null){
                    flag = true;
                    break;
                }
            }
            return flag
        })
        
        let stage2 = stage1.includes(true)
        if(stage2){
            lesson.map((item) => {
                let flag = holder[item.dayOfWeek].includes(item._id)
                if(flag){
                    this.toggleRegister(lesson)
                } else {
                    alert("Lớp đăng ký đã bị trùng")
                }
            })
        } else {
            this.toggleRegister(lesson)
        }
    }

    render() {
        return (
            <ScrollView style={styles.general}>
                <Header style={styles.headerContainer}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <View style={styles.headerInfoContainer}>
                        <Text style={{color: '#fff', fontSize: 25}}>Đăng ký học</Text>
                    </View>
                </Header>
                <View style={{flex: 1}}>
                    {
                        (this.state.loading)? (
                            <Loading/>
                        ) : (
                            <View style = {{flex: 1}}>
                                <View style={{flex: 1, top: 10}}>
                                <View style={{width: screenWidth, height: 30, backgroundColor: '#9152f8'}}>
                                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Danh sách các môn</Text>
                                </View>
                                <ScrollView>
                                    {
                                        this.state.subjectList.map((item, index) => {
                                            return (
                                                <TouchableOpacity 
                                                style={{padding: 10}} 
                                                key={index} 
                                                onPress={() => {
                                                    this.setState({
                                                        selectedSubject: item,
                                                        selectedSubjectClasses: item.lessons
                                                    })
                                                }}
                                                >
                                                    <Text>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>

                            <View style={{flex: 1, top: 10}}>
                                <View style={{width: screenWidth, height: 30, backgroundColor: '#9152f8'}}>
                                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Danh sách các lớp</Text>
                                </View>
                                <ScrollView style={{width: screenWidth}}>
                                    {
                                        (this.state.selectedSubject === null) ? (
                                            null
                                        ) : (
                                            this.state.selectedSubjectClasses.map((lesson) => {
                                                
                                                let string = '';
                                                lesson.map((item) => {
                                                    string = string + item.name + "     Thứ " + (item.dayOfWeek+1) + "     Ca " + item.from.name + " - Ca " + item.to.name + "     " + item.count + "/" + item.capacity.max + "\n";
                                                })
                                                
                                                return (
                                                    <TouchableOpacity 
                                                        style={{padding: 10, borderWidth: 1, width: screenWidth*2}} 
                                                        onPress={() => {
                                                            this.classSelecterHandler(lesson)
                                                            // this.toggleRegister(lesson)
                                                        }}
                                                        key={lesson._id}
                                                    >
                                                        <Text>{string}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        )
                                    }
                                </ScrollView>
                            </View>
                            <View style={{flex: 1, top: 10}}>
                                <View style={{width: screenWidth, height: 30, backgroundColor: '#9152f8'}}>
                                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Thời khóa biểu</Text>
                                </View>
                                <TableSchedule list={this.state.list}/>
                            </View>
                            </View>
                        )
                }
                </View>
            </ScrollView>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    general: {
        flex: 1
    },
    headerContainer: {
        backgroundColor: '#9152f8',
        height: 70,
        position: 'relative'
    },
    headerInfoContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center'
    },
    menuContainer: {
        position: 'absolute',
        left: 20,
        alignSelf: 'center',
        flex: 1
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textLabel: {
        color: '#9152f8',
        fontSize: 25, 
        padding: 10
    },
    text: {
        fontSize: 20,
        color: 'black',
        padding: 10
    }
});