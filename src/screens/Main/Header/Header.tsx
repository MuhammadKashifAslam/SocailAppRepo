import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const SIZE = responsiveFontSize(2.6);

const backSvgXmlData = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </g>
  </svg>
`;
const drawerSvgXmlData = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path fill="#ffffff" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
`;

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.headerContainer}>
      {route.name !== 'HomeScreen' ? (
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <SvgXml xml={backSvgXmlData} width="30" height="30" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.openDrawer()}>
          <SvgXml xml={drawerSvgXmlData} width="30" height="30" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black', // You can change the background color as per your requirement
  },
  iconButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default Header;
