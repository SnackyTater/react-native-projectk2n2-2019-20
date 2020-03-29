import { StyleSheet, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
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
    }
});