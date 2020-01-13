import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    //https://dangkyhoctlu.herokuapp.com/api/

    //load data when navigated to this component
    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            const postData = JSON.parse(preData);
            let url = 'https://dangkyhoctlu.herokuapp.com/api/result/student/' + postData.user._id + '?speciality=' + postData.user.info.speciality._id;
            fetch(URL, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + postData.token,
                }
            }).then((res) => res.json()).then((data) => {
                this.setState({
                    list: [...data.results]
                });
            }).done();
        }).catch((err) => {console.log('')}); 
    }

    render() {
        return (
            <View>
                <Text>dawdawd</Text>
            </View>
        )
    }
}

