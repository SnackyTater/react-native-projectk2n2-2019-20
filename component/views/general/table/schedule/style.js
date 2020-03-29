import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#9152f8'  },
    wrapper: { flexDirection: 'row', width: 800, height: 350},
    title: { flex: 1, backgroundColor: '#9152f8'},
    row: {  height: 35  },
    text: { textAlign: 'center', color: 'white' },
    subjectInfoContainer: {    
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});