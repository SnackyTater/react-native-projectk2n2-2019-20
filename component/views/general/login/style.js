import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper:{
        flex: 1
      },
      container: {
        flex: 1
      },
      header: {
        height: 200,
        backgroundColor: '#9152f8',
        position: 'relative'
      },
      imageContainer:{
        position: 'absolute',
        flex: 1,
        overflow: 'hidden',
        height: 150,
        width: 150,
        borderRadius: 150/2,
        alignSelf: 'center',
        bottom: '5%'
      },
      img: {
        flex:1,
        width: 150,
        height: 150,
        resizeMode: 'contain'
      },
      body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#9152f8',
        paddingLeft: 40,
        paddingRight: 40
      },
      text: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold'
      },
      textInputOnBlur: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#9152f8',
        color: 'white',
        borderColor: '#d6d7da',
        borderWidth: 0.5,
        borderRadius: 50
      },
      textInputOnFocus: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: 'white',
        color: 'black',
        borderColor: '#d6d7da',
        borderWidth: 0.5,
        borderRadius: 50
      },
      button: {
        width: 150,
        backgroundColor: 'white',
        top: 50,
        padding: 20,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center'
      },
});