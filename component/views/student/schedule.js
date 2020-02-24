import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import { getCurrentSemesterAndYear, getTimeNow } from '../../../utils/utility';
import Loading from '../general/loading';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this)
        this.state = {
            userID: '',
            sessionToken: '',
            currentSemester: 0,
            currentYear: '',

            list: [],
            subjectList: [],

            //table setting
            tableHeader: ['Tên lớp', 'Phòng', 'Thứ', 'Ca'],
            widthArr: [200,100,100,100],

            //drop down list setting
            filterOptionSemester: [{value: 1}, {value: 2}, {value: 3}],

            loading: true
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        console.log('blin1')
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
            console.log('blin2')
            //fetch data from server
            this.getScheduleData(this.state.userID, this.state.currentSemester, this.state.currentYear, this.state.sessionToken);

        }).catch((err) => {console.log('')});
    }

    listProcessor(rawList){
            let processedList = [];
            var totalCredits = 0;
            rawList.map((listItem) => {
                //setup variable
                let holder = [];
                let shift = listItem.from.name + '-' + listItem.to.name;

                //push to holder
                holder.push(listItem.class.name);
                holder.push(listItem.classRoom.name);
                holder.push(listItem.dayOfWeek);
                holder.push(shift);

                //push to processed list
                processedList.push(holder);
            })
            this.setState({
                totalCredits: totalCredits
            })
            return processedList;
    }

    getScheduleData(userID, semester, year, token){
        console.log('blin3')
        let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userID + '/semester/'+ semester +'/year/'+ year +'?active=true';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => res.json()).then((data) => {
            console.log('blin4')
            if(data == null){
                alert('Không có dữ liệu thời khóa biểu của kỳ ' + semester );
                this.setState({
                    loading: false
                })
            }
            else{
                console.log(data)
                let holder = this.listProcessor(data.list)
                this.setState({
                    list: [...data.list],
                    subjectList: [...holder],
                    loading: false
                });
            }
        }).done();
    }

    onChangeText(semester){
        this.setState({
            loading: true
        })
        this.getScheduleData(this.state.userID , semester, this.state.currentYear, this.state.sessionToken)
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

                <Dropdown label='chọn kỳ học' data={this.state.filterOptionSemester} onChangeText={this.onChangeText}/>
                {
                    (this.state.loading) ? <Loading/> : 
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal={true}>
                            <View style={styles.resultTable}>
                                <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                                </Table>
                                <ScrollView style={styles.tableDataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                        {
                                            this.state.subjectList.map((rowData, index) => (
                                                <Row key={index} widthArr={this.state.widthArr} data={rowData} style={styles.tableRow} textStyle={styles.tableText}/>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                }
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