import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import Header from '../Main/Header/Header'
import {
  LoginManager,
} from 'react-native-fbsdk';
const HomeScreen = observer(({ navigation }) => {
  const { userStore } = useStore();

  const signOut = async () => {
    try {
      // await GoogleSignin.signOut();
      await LoginManager.logOut();
      userStore.logout();
      await AsyncStorage.removeItem('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
  <Header  title={'Main'}/>

      <Text style={styles.title}>Welcome, {userStore.user?.firstName}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
  },
});

export default HomeScreen;
