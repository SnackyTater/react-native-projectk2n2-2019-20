import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.general}>
                <View style={styles.body}>
                    <Image style = {styles.img} source={require('../../../../assets/splash2.gif')}/>
                </View>
            </View>
        )
    } 
    
}
//sth
