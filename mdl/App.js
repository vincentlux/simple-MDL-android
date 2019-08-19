/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';


import HomeScreen from './pages/HomeScreen';
import ResultScreen from './pages/ResultScreen';
import UploadScreen from './pages/UploadScreen';
import HelpScreen from './pages/HelpScreen';
import DetailScreen from './pages/DetailScreen';

import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Result: ResultScreen,
  Detail: DetailScreen
},
{
  initialRouteName: "Home",
  headerLayoutPreset: "center",
  
}
);



HomeStack.navigationOptions= { 
  header: null,
  tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/images/magnify.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ), 
};


const RootStack = createBottomTabNavigator({
  Search: HomeStack,
  Mailbox: UploadScreen,
  Help: HelpScreen
},
{
  initialRouteName: "Search"
}
);

const AppContainer = createAppContainer(RootStack);

// initiate as always
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 26,
  },
});


