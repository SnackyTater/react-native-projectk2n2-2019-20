import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, Text } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import {getCurrentSemesterAndYear, getTimeNow} from '../../../utils/utility';
import Loading from '../general/loading'

export default class schoolSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onChangeSchoolYear = this.onChangeSchoolYear.bind(this)
        this.onChangeSemester = this.onChangeSemester.bind(this)
        this.state = {
            //filter options holder
            schoolYear: '',
            semester: 0,
            studentGroup: 2,

            //lists
            list: [],
            processedList: [],

            //table settings
            tableHeader: ['Mã môn', 'Tên môn', 'Tên lớp', 'Thứ', 'Ca', 'Phòng học', 'Tín chỉ', 'Giáo viên'],
            widthArr: [100,200,200,100,100,100,100,200],

            //filter options
            schoolYearFilter: [{value: '2018-2019'}],
            semesterFilter: [{value: 1}, {value: 2}, {value: 3}],
            studentGroupFilter: [{value: 1}, {value: 2}, {value: 3}],

            loading: true
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            const data = JSON.parse(preData);
            
            fetch('https://dangkyhoctlu.herokuapp.com/api/school-schedule/all', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.token,
                }
            }).then((res) => res.json()).then((Schedule) => {
                //inititae filter
                let schoolYearHolder = getCurrentSemesterAndYear(getTimeNow());
                let schoolYearFilter = this.inititateSchoolYearFilter(Schedule);
                
                //filter original list
                let processedList = this.listFilter(Schedule, schoolYearHolder.currentSemester, this.state.studentGroup, schoolYearHolder.currentYear)

                this.setState({
                    list: [...Schedule],
                    schoolYearFilter: [...schoolYearFilter],
                    processedList: [...processedList],
                    studentGroup: 2,
                    schoolYear: schoolYearHolder.currentYear,
                    semester: schoolYearHolder.currentSemester,
                    loading: false
                })
            }).done();
        }).catch((err) => {console.log('')});
    }

    inititateSchoolYearFilter(rawList){
        var yearFilter = []
        this.state.schoolYearFilter.forEach((item) => {
            yearFilter.push(item.value)
        })
        
        rawList.map((listItem) => {
            let schoolYear = listItem.year.from + '-' + listItem.year.to
            let flag = yearFilter.includes(schoolYear)
            if(!flag){
                yearFilter.push(schoolYear)
            }
        })

        let holder = []
        yearFilter.map((listItem) => {
            holder.push({value: listItem})
        })

        return holder;
    }

    listFilter(rawList, semester, group, schoolYear){
        let schoolYearFrom = schoolYear.slice(0,4);
        let SchoolYearTo = schoolYear.slice(5,10);

        var count = 0;
        let processedList = rawList.map((listItem) => {
            if(listItem.semester == semester && listItem.studentGroup == group && listItem.year.from == schoolYearFrom && listItem.year.to == SchoolYearTo){
                //setup variable 
                let holder = [];
                var shift = listItem.from.name + '-' + listItem.to.name;

                count = count + 1;
                //push to holder
                holder.push(listItem.class.subject.subjectID);
                holder.push(listItem.class.subject.name);
                holder.push(listItem.class.name);
                holder.push(listItem.dayOfWeek);
                holder.push(shift);
                holder.push(listItem.classRoom.name);
                holder.push(listItem.class.subject.coefficient);
                if (typeof listItem.instructor.user === "undefined"){
                    holder.push('');
                }else{
                    holder.push(listItem.instructor.user.name);
                }

                //push to processed list
                return holder
            }
        })
        return processedList;
    }

    onChangeSemester(semester){
        console.disableYellowBox = true;
        this.setState({
            loading: true
        })
        let holder = this.listFilter(this.state.list, semester , this.state.studentGroup, this.state.schoolYear)
        this.setState({
            semester: semester,
            processedList: [...holder],
            loading: false,
        })
    }

    onChangeSchoolYear(year){
        console.disableYellowBox = true;
        this.setState({
            loading: true
        })
        let holder = this.listFilter(this.state.list, this.state.semester , this.state.studentGroup, year)
        this.setState({
            schoolYear: year,
            processedList: [...holder],
            loading: false,
        })
    }

    onChangeGroup(group){
        this.setState({
            loading: true
        })
        console.disableYellowBox = true;
        let holder = this.listFilter(this.state.list, this.state.semester , group, this.state.schoolYear)
        this.setState({
            studentGroup: group,
            processedList: [...holder],
            loading: false,
        })
    }
    
    render() {
        return (
            <View style={styles.general}>
                <Header style={styles.headerContainer}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <View style={styles.headerInfoContainer}>
                        <Text style={{color: '#fff', fontSize: 20}}>Thời khóa biểu toàn trường</Text>
                    </View>
                </Header>
                <Dropdown label='Chọn kỳ học' data={this.state.semesterFilter} onChangeText={this.onChangeSemester}/>
                <Dropdown label='Chọn nhóm' data={this.state.studentGroupFilter} onChangeText={this.onChangeGroup}/>
                <Dropdown label='Chọn năm học' data={this.state.schoolYearFilter} onChangeText={this.onChangeSchoolYear}/>
                <View style={styles.infoContainer}>
                    {
                        (this.state.loading)? <Loading/> : 
                        <ScrollView horizontal={true}>
                            <View>
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
                        </ScrollView>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    general: {
        flex: 1,
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
    tableContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#9152f8' },
    tableText: {     fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}

});

