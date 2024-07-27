import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
 

const chat = (({ navigation }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="Logout" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
  },
});

export default chat;
