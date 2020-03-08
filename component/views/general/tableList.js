import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';



export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            list: [],

            //table setting
            tableHeader: [],
            widthArr: [],
        }
    }

    async componentDidMount(){
        let filter = {
            semester: this.props.semester,
            group: this.props.group,
            schoolYear: this.props.schoolYear
        }
        let holder = this.listProcessor(this.props.list, this.props.option, filter);
        this.setState({
            list: [...holder],
            tableHeader: this.props.tableHeader,
            widthArr: this.props.widthArr
        })
    }

    listProcessor(rawList, condition, filter){
        if(condition === 'schedule'){
            return this.personalScheduleProcessor(rawList)
        } if(condition === 'schoolSchedule') {
            return this.schoolScheduleProcessor(rawList, filter)
        } if(condition === 'result') {

        }
    }

    personalScheduleProcessor(rawList){
        let processedList = rawList.map((listItem) => {
            let shift = listItem.from.name + '-' + listItem.to.name;
            return [listItem.class.name, listItem.classRoom.name, listItem.dayOfWeek, shift]
        })
        return processedList;
    }

    schoolScheduleProcessor(rawList, filter){
        let schoolYearFrom = filter.schoolYear.slice(0,4);
        let SchoolYearTo = filter.schoolYear.slice(5,10);

        var count = 0;
        let processedList = rawList.map((listItem) => {
            if(listItem.semester == filter.semester && listItem.studentGroup == filter.group && listItem.year.from == schoolYearFrom && listItem.year.to == SchoolYearTo){
                if(count >= 100){
                    return null;
                }
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

    render() {
        return (
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                        <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                    </Table>
                    <ScrollView style={styles.tableDataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                        {
                            this.state.list.map((rowData, index) => (
                                <Row key={index} widthArr={this.state.widthArr} data={rowData} style={styles.tableRow} textStyle={styles.tableText}/>
                            ))
                        }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>      
        )
    }
}

const styles = StyleSheet.create({
    tableContainer: { flex: 1, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#9152f8' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}
});