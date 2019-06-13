/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';


import HomeScreen from './pages/HomeScreen';
import UploadScreen from './pages/UploadScreen';
import HelpScreen from './pages/HelpScreen';

import { createAppContainer, createBottomTabNavigator } from "react-navigation";


const RootStack = createBottomTabNavigator({
  MDL: HomeScreen,
  Upload: UploadScreen,
  Help: HelpScreen
},
{
  initialRouteName: "MDL"
}
);

const AppContainer = createAppContainer(RootStack);

// initiate as always
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#F5FCFF',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });


