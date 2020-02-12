import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Loading from '../general/loading';

export default class schoolSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            processedList: [],
            tableHeader: ['Mã môn', 'Tên môn', 'Tên lớp', 'Thứ', 'Ca', 'Phòng học', 'Tín chỉ', 'Giáo viên'],
            widthArr: [100,200,200,100,100,100,100,200]
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
                let processedList = this.listProcessor(Schedule,'');
                this.setState({
                    list: [...Schedule],
                    processedList: [...processedList]
                });              

            }).done();
        }).catch((err) => {console.log('')});
    }

    listProcessor(rawList, condition){
        if(condition==''){
            let processedList = []
            rawList.map((listItem) => {
                //setup variable 
                let holder = [];
                var shift = listItem.from.name + '-' + listItem.to.name;

                //push to holder
                holder.push(listItem.class.subject.subjectID);
                holder.push(listItem.class.subject.name);
                holder.push(listItem.class.name);
                holder.push(listItem.dayOfWeek);
                holder.push(shift);
                holder.push(listItem.classRoom.name);
                holder.push(listItem.class.subject.coefficient);
                holder.push(listItem.instructor.user.name);

                //push to processed list
                processedList.push(holder);
            })
            console.log(processedList);
            return processedList;
        } else {

        }
    }

    render() {
        return (
            <View style={styles.general}>
                <Header style={styles.headerContainer}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style={styles.infoContainer}>
                    <ScrollView horizontal={true}>
                        {/*filter menu */}
                        <View>
                            
                        </View>

                        {/*table start here*/}
                        <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                            </Table>
                            <ScrollView style={styles.tableDataWrapper}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
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
        flex: 1,
        backgroundColor: '#fff',
    },
    tableContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#537791' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}

});

