import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import {resultProcessor, schoolScheduleProcessor, personalScheduleProcessor} from './processor'
import styles from './style'

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
            return personalScheduleProcessor(rawList)
        } if(condition === 'schoolSchedule') {
            return schoolScheduleProcessor(rawList, filter)
        } if(condition === 'result') {
            return resultProcessor(rawList)
        }
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
