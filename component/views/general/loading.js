import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.general}>
                <View style={styles.body}>
                    <Image style = {styles.img} source={require('../../../assets/splash2.gif')}/>
                </View>
            </View>
        )
    } 
    
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    general: {
        flex: 1
    },
    body: {
        flex: 1
    },
    img: {
        height: screenWidth*3/4,
        width: screenWidth*3/4,
        alignSelf: 'center',
        top: screenHeight*1/5
    }
});