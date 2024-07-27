import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
  } from '@react-navigation/bottom-tabs';
  import React from 'react';
  import {Image, StyleSheet, Text, View} from 'react-native';
  import {
    responsiveFontSize,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
  import {useSelector} from 'react-redux';
  import {EventRegister} from 'react-native-event-listeners';
  import setting from '../Main/Setting';
  import chat from '../Main/Chat/Chat';
  import Notification from '../Main/Notification';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import  Images from '../../Resource'
  import {ROUTE} from './RouteName';
import colors from '../../Utils/colors';
import HomeScreen from '../Main/HomeScreen';
  
  const SIZE = responsiveFontSize(2.6);
  ('70%'); //responsiveFontSize(3);
  const SELECTED_COLOR = 'red';
  const UN_SELECTED_COLOR = 'pink';
  const BottomTabStack = createBottomTabNavigator();
  
  const getTabBarIcon =
    (routeName: any) =>
    ({focused}: any) => {
      const iconColor = focused ? SELECTED_COLOR : UN_SELECTED_COLOR;
  
      let icon = Images.user;
  
      if (routeName === ROUTE.HomeScreen) {
        icon = Images.Setting;
      } else if (routeName === ROUTE.Chat) {
        icon = Images.chat;
      } else if (routeName === ROUTE.Notification) {
        icon = Images.dropdown;
      }
      
      return (
        <>
          
          <Image
            style={[styles.icon, {tintColor: iconColor}]}
            resizeMethod={'scale'}
            resizeMode={'contain'}
            source={icon}
          />
        </>
      );
    };
  
  const getTabBarLabel =
    (routeName: any) =>
    ({focused}: any) =>
      (
        // [
        //   styles.tabBarLabelText,
        //   focused ? styles.tabBarLabelFocusedText : null,
        // ]
        <Text style={styles.tabBarLabelText}>
          {routeName === ROUTE.Chat
            ? 'Chat'
            : routeName === ROUTE.Setting
            ? 'HomeScreen '
            : routeName}
        </Text>
      );
  
  const screenOptionsBottomTab = ({route}: any): BottomTabNavigationOptions => ({
    tabBarIcon: getTabBarIcon(route?.name),
    tabBarLabel: getTabBarLabel(route?.name),
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
    tabBarItemStyle: styles.tabBarItemStyle,
  });
  
  const BottomTabNav = () => {
    const listener = ({navigation}: any) => ({
      tabPress: () => {
        if (navigation.isFocused()) {
          EventRegister.emit('scrollToTop', '');
        }
      },
    });
 
    return (
      <BottomTabStack.Navigator screenOptions={screenOptionsBottomTab}>
        <BottomTabStack.Screen
          name={ROUTE.HomeScreen}
          component={HomeScreen}
          listeners={listener}
        />
        <BottomTabStack.Screen
          name={ROUTE.Chat}
          component={chat}
          listeners={listener}
        />
        <BottomTabStack.Screen
          name={ROUTE.Notification}
          component={Notification}
          listeners={listener}
        />
      
      </BottomTabStack.Navigator>
    );

  };
    
  const styles = StyleSheet.create({
    tabBarLabelText: {
      fontSize: responsiveFontSize(1.5),
      color: UN_SELECTED_COLOR,
      fontFamily: '400',
      textTransform: 'capitalize',
    },
  
    tabBarBadgeStyle: {
      backgroundColor: 'red',
  
      maxWidth: responsiveFontSize(1.1),
      maxHeight: responsiveFontSize(1.1),
  
      alignSelf: undefined,
    },
    tabBarLabelFocusedText: {
      color: SELECTED_COLOR,
    },
    icon: {
      height: SIZE,
      width: SIZE,
    },
    tabBarStyle: {
      backgroundColor: colors?.black,
      borderTopWidth: 0,
      paddingLeft: '3%',
    //   ...(isIpad ? {height: '8%'} : null),
      width: '100%',
      margin: 0,
  
    //   ...(IOS
    //     ? {paddingBottom: responsiveHeight(100) > 800 && !isIpad ? '5%' : '2%'}
    //     : null),
    //   padding: 0,
    },
    tabBarItemStyle: {
      flexDirection: 'column',
      padding: '0.5%',
    },
    unReadMessages: {
      backgroundColor: colors.RebeccaPurple,
      width: responsiveFontSize(1),
      height: responsiveFontSize(1),
      borderRadius: responsiveFontSize(3),
      zIndex: 100,
      position: 'absolute',
      top: 2,
      right: responsiveFontSize(4.2),
    },
  });
  
  export default BottomTabNav;
  