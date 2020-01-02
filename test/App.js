import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [people, setName] = useState([
    {name: 'blin', id: '1'},
    {name: 'blin2', id: '2'},
    {name: 'blin3', id: '3'},
    {name: 'blin4', id: '4'},
    {name: 'blin5', id: '5'},
    {name: 'blin6', id: '6'},
  ]);

  const clickHandler = (data) => {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        //extract id & use as key
        keyExtractor={(item) => item.id}
        data = {people}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => clickHandler(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold'
  },
  body: {
    backgroundColor: 'yellow'
  },
  buttonContainer: {
    marginTop: 20,
  }
});
