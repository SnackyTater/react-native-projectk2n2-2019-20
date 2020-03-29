import React from 'react';
import { StyleSheet, View, AsyncStorage, Text , TouchableOpacity, Dimensions} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

import {getCurrentSemesterAndYear, getTimeNow} from '../../../utils/utility';

import Loading from '../general/loading/loading';
import TableList from '../general/table/list/tableList';

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

            //table settings
            tableHeader: ['Mã môn', 'Tên môn', 'Tên lớp', 'Thứ', 'Ca', 'Phòng học', 'Tín chỉ', 'Giáo viên'],
            widthArr: [100,200,200,100,100,100,100,200],

            //filter options
            schoolYearFilter: [{value: '2018-2019'}],
            semesterFilter: [{value: 1}, {value: 2}, {value: 3}],
            studentGroupFilter: [{value: 1}, {value: 2}, {value: 3}],

            //component status
            filterStatus: false,
            tableStatus: 100,
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

                this.setState({
                    list: [...Schedule],
                    schoolYearFilter: [...schoolYearFilter],
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

    filterStatusHandler(status){
        (status) ? (
            this.setState({
                filterStatus: false,
                tableStatus: 100
            })
        ) : (
            this.setState({
                filterStatus: true,
                tableStatus: 280
            })
        )
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
                <TouchableOpacity style={styles.filter} onPress={() => {this.filterStatusHandler(this.state.filterStatus)}}>
                    <Text style={{textAlign:'center', fontSize: 30, color: 'white'}}>Filter</Text>
                </TouchableOpacity>
                {
                    (this.state.filterStatus) ? (
                        <View style={styles.filterMenu}>
                            <Dropdown label='Chọn kỳ học' data={this.state.semesterFilter} onChangeText={this.onChangeSemester}/>
                            <Dropdown label='Chọn nhóm' data={this.state.studentGroupFilter} onChangeText={this.onChangeGroup}/>
                            <Dropdown label='Chọn năm học' data={this.state.schoolYearFilter} onChangeText={this.onChangeSchoolYear}/>
                        </View>
                    ) : (null)
                }

                <View style={{top: this.state.tableStatus}}>
                    {
                        (this.state.loading)? (
                            <Loading/>
                        ) : (
                            <TableList 
                                list={this.state.list} 
                                tableHeader={this.state.tableHeader} 
                                widthArr={this.state.widthArr} 
                                option={'schoolSchedule'} 
                                semester={this.state.semester} 
                                group={this.state.studentGroup} 
                                schoolYear={this.state.schoolYear}
                            />
                        )    
                    }
                </View>
            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);

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
    tableContainer: {
        top: 100,
        bottom: 100,
        backgroundColor: '#fff',
    },
    filter: {
        position: 'absolute',
        top: 80,
        width: screenWidth*4/5,
        borderRadius: 50,
        height: 50,
        backgroundColor: '#9152f8',
        alignSelf: 'center',
        flex: 1,
    },
    filterMenu: {
        position: 'absolute',
        top: 130,
        width: screenWidth
    }
});

