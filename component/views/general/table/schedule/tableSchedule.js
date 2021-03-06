import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import styles from './style'

export default class TableSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //lists
            dummyList: [],

            //table setting
            heightArr: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
            widthArr: [110, 110, 110, 110, 110, 110, 110, 110],
            tableHead: ['', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
            tableTitle: ['1','2','3','4','5','6','7','8','9','10'],
            tableData: []
        }
    }

    async componentDidMount(){
        let holder = this.createDummyList()
        await this.setState({
            dummyList: holder
        })
    }

    listProcessor(rawList){
        let processedList = rawList.map((listItem) => {
            //setup variable
            let holder = [];

            //push to holder
            holder.push(listItem.class.name);
            holder.push(listItem.classRoom.name);
            holder.push(listItem.dayOfWeek);
            holder.push(listItem.from.name);
            holder.push(listItem.to.name);

            return holder
        })
        return processedList;
    }

    createDummyList(){
        let arr = []
        for(let i = 0; i < 10 ; i++) {
            arr.push([' ', ' ', ' ', ' ', ' ', ' ', ' ',])
        }
        return arr
    }

    render() {
        return (
            <ScrollView horizontal={true}>
                <Table borderStyle={{borderWidth: 1}}>
                    <Row data={this.state.tableHead} widthArr={[100, 100, 100, 100, 100, 100, 100, 100]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={this.state.tableTitle} style={styles.title} heightArr={this.state.heightArr} widthArr = {[100]} textStyle={styles.text}/>
                        <Rows data={this.state.dummyList} widthArr={[ 100, 100, 100, 100, 100, 100, 100,]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                </Table>
                {
                    this.listProcessor(this.props.list).map((item) => {
                        let dayOfWeek = item[2] + 1;
                        let start = item[3] - 1;
                        let duration = item[4] - item[3] + 1;
                        let leftConfig;
                        switch(dayOfWeek) {
                            case 2: 
                                leftConfig = 1;
                                break;
                            case 3: 
                                leftConfig = 2;
                                break;
                            case 4: 
                                leftConfig = 3;
                                break;
                            case 5: 
                                leftConfig = 4;
                                break;
                            case 6: 
                                leftConfig = 5;
                                break;
                            case 7: 
                                leftConfig = 6;
                                break;
                            case 8: 
                                leftConfig = 7;
                                break;
                        }
                        return (
                            <View style={{height: (35*duration)-1, width: 99, position: 'absolute', backgroundColor: '#9152f8', left: (101*dayOfWeek)-leftConfig, top: 41+(35*start)}}>
                                <View style={styles.subjectInfoContainer}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>{item[0]}</Text>
                                    <Text style={{color: 'white', textAlign: 'center'}}>{item[1]}</Text>
                                </View>
                            </View>
                        ) 
                    })
                }
            </ScrollView>
        )
    }
}

