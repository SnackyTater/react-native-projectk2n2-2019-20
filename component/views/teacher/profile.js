import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import {Header, Left, Icon} from 'native-base';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: '',
            dob: '',
            phone: '',
            email: '',
            identityID: '',
            specialty: ''
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        console.log('profile entered');
        //get item from async storage
        AsyncStorage.getItem('user').then((preData) => {
            let data = JSON.parse(preData);
            console.log(data);
            let dob = data.user.dob.slice(0, 10);
            this.setState({
                name: data.user.name,
                dob: dob,
                phone: data.user.phone,
                email: data.user.email,
                identityID: data.user.identityID,
                specialty: data.user.info.division.name,
                loading: false
            });
        }).catch((err) => {
            console.log('')
        });
    }


    render() {
            return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                        <View style={styles.headerInfoContainer}>
                            <Text style={{color: '#fff', fontSize: 25}}>Thông tin cá nhân</Text>
                        </View>
                    </Header>
                    <View style={styles.infoContainer}>
                        <Text style={styles.textLabel}>Họ tên: <Text style={styles.text}>{this.state.name}</Text></Text>
                        <Text style={styles.textLabel}>Ngày sinh: <Text style={styles.text}>{this.state.dob}</Text></Text>
                        <Text style={styles.textLabel}>Số điện thoại: <Text style={styles.text}>{this.state.phone}</Text></Text>
                        <Text style={styles.textLabel}>E-mail: <Text style={styles.text}>{this.state.email}</Text></Text>
                        <Text style={styles.textLabel}>Chuyên ngành: <Text style={styles.text}>{this.state.specialty}</Text></Text>
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
    infoContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textLabel: {
        color: '#9152f8',
        fontSize: 25, 
        padding: 10
    },
    text: {
        fontSize: 20,
        color: 'black',
        padding: 10
    }
});