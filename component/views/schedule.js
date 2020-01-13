import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {Header, Left, Icon} from 'native-base';

export default class Schedule extends React.Component {
    render() {
        return (
            <View style={styles.general}>
                <Header style={styles.headerContainer}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style={styles.infoContainer}>
                    <Text>awdawdawd</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    general: {
        flex: 1
    },
    headerContainer: {
        backgroundColor: '#9152f8',
        height: 70
    },
    menuContainer: {
        flex: 1
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
});
