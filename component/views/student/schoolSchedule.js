import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Loading from '../general/loading';

export default class schoolSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
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
                this.setState({
                    list: [...Schedule]
                });
            }).done();
        }).catch((err) => {console.log('')}); 
    }

    // showState() {
    //     // console.log(this.state.list);
    //     console.log(typeof(this.state.list));
    // }
    
    // blin() {
    //     let sth = this.state.list;
    //     console.log(sth);
    // }

    render() {
        return (
            <View style={styles.general}>
                <Header style={styles.headerContainer}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style={styles.infoContainer}>
                    <ScrollView>
                        {
                            this.state.list.map((item) => {
                                return(
                                    <View style = {styles.listItem} key={item._id}>
                                        <Text>{item.class.subject.subjectID}</Text>
                                        <Text>{item.class.subject.name}</Text>
                                        <Text>{item.class.name}</Text>
                                        <Text>{item.dayOfWeek}</Text>
                                        <Text>{item.from.name}-{item.to.name}</Text>
                                        <Text>{item.instructor.name}</Text>
                                    </View>
                                )
                            })
                        }
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
    listItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
});

