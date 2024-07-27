import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header/Header';



const Notification = (({ navigation }) => {


  return (
    <View style={styles.container}>
        <Header  title={'Notification'}/>
      <Text style={styles.title}>Welcome Notification</Text>
    
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
  },
});

export default Notification;
