import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {Header, Left, Icon} from 'native-base';

import TableSchedule from '../general/table/schedule/tableSchedule';
import Loading from '../general/loading/loading';

import {getTimeNow, getCurrentSemesterAndYear} from '../../../utils/utility';
import {getRegistrationEvent, toggleRegister} from '../../../controller/fetcher/registerController';
import {getScheduleData} from '../../../controller/fetcher/scheduleController'

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
        AsyncStorage.getItem('user').then((preData) => {JSON.parse(preData)}).then((postData) => {
            let currentSemesterAndYear = getCurrentSemesterAndYear(getTimeNow());
            let tracker = this.generateEmptyTracker()

            this.setState({
                userData: postData.user,
                token: postData.token,
                semester: currentSemesterAndYear.currentSemester,
                schoolYear: currentSemesterAndYear.currentYear,
                scheduleTracker: tracker
            })

            getRegistrationEvent(this.state.token, this.state.userData).then((data) => {
                (data.message) ? (
                    this.setState({
                        loading: false
                    }),
                    alert(data.message)
                ) : (
                    this.setState({
                        subjectList: data.subjectList,
                    }),
                    getScheduleData('student', this.state.userData.user._id, this.state.semester, this.state.schoolYear, this.state.token).then((schedule) => {
                        if(schedule === null){
                            this.setState({
                                schedule: [],
                                loading: false
                            })
                        } else {
                            this.setState({
                                schedule: schedule.list,
                                loading: false
                            });
                            this.trackerHandler(schedule.list, this.state.scheduleTracker)
                        }
                    })
                )
            })
        }).catch((err) => {console.log(err)}); 
    }

    generateEmptyTracker(){
        let holder = []
        for(let i = 0; i < 7; i++){
            holder.push([null, null, null, null, null, null, null, null, null, null,])
        }
        return holder
    }

    //track schedule of every class in day of week
    trackerHandler(schedule, tracker){
        let holder = tracker
        schedule.forEach((item) => {
            let sth = tracker[item.dayOfWeek]

            for (let i = item.from.name-1; i < item.to.name; i ++){
                sth[i] = item._id
            }

            holder[item.dayOfWeek] = sth
        })
        this.setState({
            scheduleTracker: holder
        })
    }

    registerHandler(lessons){
        toggleRegister(lessons, this.state.selectedSubject, userData.user.info._id, this.state.semester, this.state.schoolYear, this.state.token).then((res) => res.json()).then((data) => {
            this.studentCounter(lessons, data.list)
            getScheduleData('student', this.state.userData.user._id, this.state.semester, this.state.schoolYear, this.state.token)
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

    //check if selected class is match with any other class in schedule tracker
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
                    toggleRegister(lessons, this.state.selectedSubject, userData.user.info._id, this.state.semester, this.state.schoolYear, this.state.token)
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