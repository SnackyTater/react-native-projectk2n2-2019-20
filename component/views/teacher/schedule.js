import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import {getCurrentSemesterAndYear, getTimeNow} from '../../../utils/utility'

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this)
        this.state = {
            userID: '',
            sessionToken: '',
            currentSemester: 0,
            currentYear: '',

            originalList: [],
            processedList: [],

            //table setting
            tableHeader: ['Tên lớp', 'Phòng', 'Thứ', 'Ca'],
            widthArr: [200,100,100,100],

            //drop down list setting
            filterOptionSemester: [{value: 1}, {value: 2}, {value: 3}],
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            const data = JSON.parse(preData);
            
            //initiate state time value
            let currentSchoolYear = getCurrentSemesterAndYear(getTimeNow());
            //initiate get school schedule
            this.getSchedule(data.user.info._id, currentSchoolYear.currentYear, currentSchoolYear.currentSemester, data.token)

            this.setState({
                userID : data.user.info._id,
                sessionToken: data.token,
                currentSemester: currentSchoolYear.currentSemester,
                currentYear: currentSchoolYear.currentYear,
            })

        }).catch((err) => {console.log('')});
    }

    getSchedule(userID, year, semester, token){
        fetch('https://dangkyhoctlu.herokuapp.com/api/school-schedule/instructor-schedule/'+ userID +'?year=' + year + '&semester=' + semester, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                }
            }).then((res) => res.json()).then((Schedule) => {
                 let processedList = this.listProcessor(Schedule)
                this.setState({
                    originalList: [...Schedule],
                    processedList: [...processedList]
                })
        }).done();
    }


    listProcessor(rawList){
        let processedList = rawList.map((listItem) => {
            //setup variable
            let holder = [];
            let shift = listItem.from.name + '-' + listItem.to.name;

            //push to holder
            holder.push(listItem.class.name);
            holder.push(listItem.classRoom.name);
            holder.push(listItem.dayOfWeek);
            holder.push(shift);

            //push to processed list
            return holder
        })
        return processedList;
    }

    onChangeText(semester){
        this.getSchedule(this.state.originalList, this.state.currentYear, semester, this.state.sessionToken)
        console.disableYellowBox = true;
    }

    render() {
        return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                        <View style={styles.headerInfoContainer}>
                            <Text style={{color: '#fff', fontSize: 25}}>Thời khóa biểu</Text>
                        </View>
                    </Header>
                    <Text style={{fontSize: 20}}>Chọn kỳ học</Text>
                    <Dropdown label={this.state.currentSemester} data={this.state.filterOptionSemester} onChangeText={this.onChangeText}/>
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal={true}>
                            <View style={styles.resultTable}>
                                <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                                </Table>
                                <ScrollView style={styles.tableDataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                        {
                                            this.state.processedList.map((rowData, index) => (
                                                <Row key={index} widthArr={this.state.widthArr} data={rowData} style={styles.tableRow} textStyle={styles.tableText}/>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                            {/*table end here */}
                        </ScrollView>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    general: { flex: 1 },

    //css for nav bar
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

    //css for filter
    infoContainer: { height:100 },
    Text: { fontSize: 20 },

    //css for table 
    tableContainer: { flex: 1, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#9152f8' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}
});