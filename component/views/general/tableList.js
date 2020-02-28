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
        let holder = this.listProcessor(this.props.list);
        this.setState({
            list: [...holder],
            tableHeader: this.props.tableHeader,
            widthArr: this.props.widthArr
        })
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

            return holder
        })
        return processedList;
    }

    render() {
        return (
            <ScrollView horizontal={true}>
                <View style={styles.resultTable}>
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