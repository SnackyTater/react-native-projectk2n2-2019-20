import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSemester: 0,
            currentYear: '',
            list: [],
            subjectList: [],
            tableHeader: ['Tên lớp', 'Phòng', 'Thứ', 'Ca'],
            widthArr: [200,100,100,100]
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            //prepare data pre-fetch
            const postData = JSON.parse(preData);
            let holder = this.inititateStateDefaultDateValue()
            this.setState({
                currentSemester: holder.currentSemester,
                currentYear: holder.currentYear
            })
            
            //due to not adding enough data currentSemester will be set as 1
            this.setState({
                currentSemester: 1
            })

            //fetch data from server
            let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + postData.user.info._id + '/semester/'+ this.state.currentSemester +'/year/'+ this.state.currentYear +'?active=true';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + postData.token,
                }
            }).then((res) => res.json()).then((data) => {
                let holder = this.listProcessor(data.list)
                this.setState({
                    list: [...data],
                    subjectList: [...holder]
                });
                console.log('blin')
                console.log(this.state);
            }).done();
        }).catch((err) => {console.log('')}); 
    }

    inititateStateDefaultDateValue(){
        let today = this.getCurrentTimeValue();
        let date = {
            currentYear: '',
            currentSemester: 1,
        }
        if(today.month >= 9 && today.month <= 11){
            date.currentYear = today.year + '-' + (today.year+1);
            date.currentSemester = 1
        }
        if(today.month >=12 || today.month <=3){
            date.currentYear = (today.year-1) + '-' + today.year;
            date.currentSemester = 2
        }
        if(today.month >= 4 && today.month <=6){
            date.currentYear = (today.year-1) + '-' + today.year;
            date.currentSemester = 3
        }
        return date;
    }

    getCurrentTimeValue(){
        let today = new Date();
        let date = {
            date: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear()
        };
        return date;
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

    render() {
        return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                    </Header>
                    <View style={styles.tableContainerMain}>
                        <ScrollView horizontal={true}>
                            <View style={styles.resultTable}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                                </Table>
                                <ScrollView style={styles.tableDataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            this.state.subjectList.map((rowData, index) => (
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
    general: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#9152f8',
        height: 70,
    },
    menuContainer: {
        flex: 1,
    },
    infoContainer: {
        height:100,
    },
    Text: {
        fontSize: 20
    },
    tableContainerMain: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tableContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#537791' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}

});