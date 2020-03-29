import React from 'react';
import {Header, Left, Icon} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header style={styles.headerContainer}>
                <Left style={styles.menuContainer}>
                    <Icon name='menu' onPress={() => {this.props.openDrawer()}}/>
                </Left>
                <View style={styles.headerInfoContainer}>
                    <Text style={{color: '#fff', fontSize: 20}}>{this.props.headerInfo}</Text>
                </View>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
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
});