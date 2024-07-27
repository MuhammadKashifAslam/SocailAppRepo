import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerOption } from '../../Utils/constant';
import Images from '../../Resource';
import { ROUTE } from '../navigation/RouteName';

const DrawerList = [
  {
    title: DrawerOption[0],
    Icon: Images?.Home,
    screen: ROUTE?.HomeScreen,
  },
  {
    title: DrawerOption[1],
    Icon: Images?.Setting,
    screen: ROUTE?.Setting,
  },
  {
    title: DrawerOption[2],
    Icon: Images?.chat,
    screen: ROUTE?.Chat,
  },
  {
    title: DrawerOption[3],
    Icon: Images?.Setting,
    screen: ROUTE?.Notification,
  },
  {
    title: DrawerOption[4],
    Icon: Images?.logout,
    screen: ROUTE?.Login,
  },
];

const DrawerScreen = ({ navigation }) => {
  const drawerRow = (title, Icon, screen, index) => {
    const onPressRow = () => {
      navigation.navigate(screen);
    };

    return (
      <TouchableOpacity key={index} style={styles.drawerRow} onPress={onPressRow}>
        <Text style={styles.drawerRowText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {DrawerList.map((item, index) => {
        return drawerRow(item.title, item.Icon, item.screen, index);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  drawerRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  
  },
  drawerRowText: {
    color: 'green',
  },
});

export default DrawerScreen;
