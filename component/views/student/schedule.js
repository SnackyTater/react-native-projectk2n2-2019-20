import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

import { getCurrentSemesterAndYear, getTimeNow } from '../../../utils/utility';

import Loading from '../general/loading';
import TableList from '../general/tableList';
import TableSchedule from '../general/tableSchedule'
import { ScrollView } from 'react-native-gesture-handler';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeSemester = this.onChangeSemester.bind(this)
        this.onChangeTable = this.onChangeTable.bind(this)
        this.state = {
            userID: '',
            sessionToken: '',
            currentSemester: 0,
            currentYear: '',

            list: [],

            //filter setting
            filterStatus: false,
            filterOptionSemester: [{value: 1}, {value: 2}, {value: 3}],
            filterOptionTable: [{value: 'danh sách'}, {value: 'thời khóa biểu'}],
            tableType: 'danh sách',

            //table setting
            tableHeader: ['Tên lớp', 'Phòng', 'Thứ', 'Ca'],
            widthArr: [200,100,100,100],

            loading: true
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {

            //prepare data pre-fetch
            const postData = JSON.parse(preData);
            let holder = getCurrentSemesterAndYear(getTimeNow());
            this.setState({
                userID: postData.user.info._id,
                sessionToken: postData.token,
                currentSemester: holder.currentSemester,
                currentYear: holder.currentYear
            })

            //fetch data from server
            this.getScheduleData(this.state.userID, this.state.currentSemester, this.state.currentYear, this.state.sessionToken);

        }).catch((err) => {console.log('')});
    }

    getScheduleData(userID, semester, year, token){
        let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userID + '/semester/'+ semester +'/year/'+ year +'?active=true';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => res.json()).then((data) => {
            let flag = data === null 
            if(flag){
                alert('Không có dữ liệu thời khóa biểu của kỳ ' + semester );
                this.setState({
                    list: [],
                    loading: false
                })
            }else{
                this.setState({
                    list: data.list,
                    loading: false
                });
            }
        }).done();
    }

    filterStatusHandler(status){
        (status) ? (
            this.setState({
                filterStatus: false
            })
        ) : (
            this.setState({
                filterStatus: true
            })
        )
    }

    onChangeSemester(semester){
        this.setState({
            loading: true
        })
        this.getScheduleData(this.state.userID , semester, this.state.currentYear, this.state.sessionToken)
        console.disableYellowBox = true;
    }

    onChangeTable(type){
        this.setState({
            tableType: type
        })
        console.log(type)
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

                <TouchableOpacity style={styles.filter} onPress={() => {this.filterStatusHandler(this.state.filterStatus)}}>
                    <Text style={{textAlign:'center', fontSize: 30, color: 'white'}}>Filter</Text>
                </TouchableOpacity>
                {
                    (this.state.filterStatus) ? (
                        <View style={styles.filterMenu}>
                            <Dropdown label='chọn kỳ học' data={this.state.filterOptionSemester} onChangeText={this.onChangeSemester}/>
                            <Dropdown label='chọn kiểu hiển thị' data={this.state.filterOptionTable} onChangeText={this.onChangeTable}/>
                        </View>
                    ) : (null)
                }
                <View style={styles.table}>
                    {
                        (this.state.loading) ? (
                            <Loading/> 
                        ) : (
                            (this.state.tableType === 'danh sách') ? (
                                <View style={styles.tableContainer}>
                                    <TableList list={this.state.list} tableHeader={this.state.tableHeader} widthArr={this.state.widthArr} option={'schedule'}/>
                                </View>
                            ) : (
                                <ScrollView style={styles.tableContainer}>
                                    <TableSchedule list={this.state.list}/>
                                </ScrollView>
                            )
                            
                        )
                    }
                </View>
            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);

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
    table: {
        position: 'absolute',
        top: 280,
    },
    //css for filter
    filter: {
        position: 'absolute',
        top: 80,
        width: screenWidth,
        borderRadius: 50,
        height: 50,
        backgroundColor: '#9152f8'
    },
    filterMenu: {
        position: 'absolute',
        top: 130,
        width: screenWidth
    }
    
});