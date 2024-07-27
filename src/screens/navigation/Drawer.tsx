import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNav from './BottomTab';
import DrawerScreen from '../Main/DrawerScreen';
import { ROUTE } from './RouteName';

const MyDrawerStack = createDrawerNavigator();

const AuthNav = () => (
  <MyDrawerStack.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <DrawerScreen {...props} />}
  >
    <MyDrawerStack.Screen name={ROUTE?.HomeScreen} component={BottomTabNav} />
  </MyDrawerStack.Navigator>
);

export default AuthNav;
