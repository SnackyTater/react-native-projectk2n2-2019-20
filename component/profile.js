import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dob: '',
            phone: '',
            email: '',
            identityID: '',
        }
    }

    //load data when navigated to this component
    async componentDidMount(){
        //get item from async storage
        await AsyncStorage.getItem('user').then((preData) => {
            let data = JSON.parse(preData);
            let dob = data.user.dob.slice(0, 10);
            this.setState({
                name: data.user.name,
                dob: dob,
                phone: data.user.phone,
                email: data.user.email,
                identityID: data.user.identityID,
            });
        }).catch((err) => {console.log('')});
    }

    logOut() {
        AsyncStorage.removeItem('user').then(() => {
            this.props.navigation.navigate('Login');
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Họ tên: {this.state.name}</Text>
                <Text style={styles.text}>Ngày sinh: {this.state.dob}</Text>
                <Text style={styles.text}>Số điện thoại: {this.state.phone}</Text>
                <Text style={styles.text}>E-mail: {this.state.email}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3'
    },
    text: {
        color: '#fff'
    }
});

